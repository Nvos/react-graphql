package backend

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/satori/go.uuid"
	"log"
	"strings"
	"sync"
	"time"
)

type Todo struct {
	ID           string    `json:"id"`
	Text         string    `json:"text"`
	Done         bool      `json:"done"`
	CreatedAt    time.Time `json:"createdAt"`
	User         string    `json:"user"`
	LastEditedBy *string   `json:"lastEditedBy"`
	Tags         []string  `json:"tags"`
}

func (Todo) IsSearchResult() {}

type Resolver struct {
	Todos             map[string]Todo
	Users             map[string]User
	Tags              map[string]Tag
	Observers         map[string]chan Todo
	TodosChangesMutex sync.Mutex // nolint: structcheck
}

type queryResolver struct{ *Resolver }

type subscriptionResolver struct{ *Resolver }

type todoResolver struct{ *Resolver }

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}
func (r *Resolver) Todo() TodoResolver {
	return &todoResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) EditTodo(ctx context.Context, input EditTodo) (*Todo, error) {
	todo, ok := r.Resolver.Todos[input.ID]

	if !ok {
		return nil, nil
	}

	if input.Done != nil {
		todo.Done = *input.Done
	}

	if input.Text != nil {
		todo.Text = *input.Text
	}

	if input.Tags != nil {
		todo.Tags = input.Tags
	}

	todo.LastEditedBy = &input.LastEditedByID

	r.Resolver.Todos[input.ID] = todo

	r.TodosChangesMutex.Lock()
	for _, observer := range r.Observers {
		observer <- todo
	}
	r.TodosChangesMutex.Unlock()

	return &todo, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input NewUser) (User, error) {
	user := User{
		Name: input.Name,
		ID:   GenerateUUID(),
	}

	r.Users[user.ID] = user

	return user, nil
}

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (Todo, error) {
	todo := Todo{
		Text:      input.Text,
		CreatedAt: time.Now(),
		Done:      false,
		User:      input.UserID,
		ID:        GenerateUUID(),
		Tags: 	   input.Tags,
	}

	r.Resolver.Todos[todo.ID] = todo

	r.TodosChangesMutex.Lock()
	for _, observer := range r.Observers {
		observer <- todo
	}
	r.TodosChangesMutex.Unlock()

	return todo, nil
}

func (r *todoResolver) User(ctx context.Context, obj *Todo) (User, error) {
	return r.Resolver.Users[obj.User], nil
}
func (r *todoResolver) LastEditedBy(ctx context.Context, obj *Todo) (*User, error) {
	if obj.LastEditedBy != nil {
		value, ok := r.Resolver.Users[*obj.LastEditedBy]

		if ok {
			return &value, nil
		}
	}

	return nil, nil
}

func (r *todoResolver) Users(ctx context.Context, obj *Todo) (*User, error) {
	if obj.LastEditedBy != nil {
		value, ok := r.Resolver.Users[*obj.LastEditedBy]

		if ok {
			return &value, nil
		}
	}

	return nil, nil
}


func (r *todoResolver) Tags(ctx context.Context, obj *Todo) ([]Tag, error) {
	var tags []Tag
	for _, tagId := range obj.Tags {
		tags = append(tags, r.Resolver.Tags[tagId])
	}

	return tags, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]Todo, error) {
	var values []Todo

	for _, value := range r.Resolver.Todos {
		values = append(values, value)
	}

	return values, nil
}

func New() Config {
	return Config{
		Resolvers: &Resolver{
			Todos: map[string]Todo{
				"7a0bd056-7845-4250-89bc-84c9df362774": {
					Text: "Jeff do something!",
					ID:   "7a0bd056-7845-4250-89bc-84c9df362774",
					Done: false,
					CreatedAt: time.Now(),
					Tags: []string{},
					User: "7a0bd056-7845-4250-89bc-84c9df362674",
				},
			},
			Users: map[string]User{
				"7a0bd056-7845-4250-89bc-84c9df362774": {
					Name: "Jeff",
					ID:   "7a0bd056-7845-4250-89bc-84c9df362774",
				},

				"7a0bd056-7845-4250-89bc-84c9df362674": {
					Name: "Not Jeff",
					ID:   "7a0bd056-7845-4250-89bc-84c9df362674",
				},
			},
			Tags: map[string]Tag{
				"7a0bd056-7845-4250-89bc-84c9df362674": {
					ID: "7a0bd056-7845-4250-89bc-84c9df362674",
					Name: "TBD Jeff",
				},
			},
			Observers: map[string]chan Todo{},
		},
		Directives: DirectiveRoot{
			InputLogging: FieldLogging,
		},
	}
}

func (r *subscriptionResolver) TodoChanges(ctx context.Context) (<-chan Todo, error) {
	id := GenerateUUID()
	events := make(chan Todo, 1)

	go func() {
		<-ctx.Done()
		r.TodosChangesMutex.Lock()
		delete(r.Observers, id)
		r.TodosChangesMutex.Unlock()
	}()

	r.TodosChangesMutex.Lock()
	r.Observers[id] = events
	r.TodosChangesMutex.Unlock()

	return events, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]User, error) {
	var values []User

	for _, value := range r.Resolver.Users {
		values = append(values, value)
	}

	return values, nil
}

func (r *queryResolver) Todo(ctx context.Context, id string) (*Todo, error)  {
	todo, ok := r.Resolver.Todos[id]

	if ok {
		return &todo, nil
	}

	return nil, nil
}


func (r *mutationResolver) CreateTag(ctx context.Context, input NewTag) (Tag, error) {
	tag := Tag {
		ID:GenerateUUID(),
		Name: input.Name,
	}

	r.Resolver.Tags[tag.ID] = tag
	return tag, nil
}

func (r *mutationResolver) EditTag(ctx context.Context, input EditTag) (*Tag, error) {
	tag, ok := r.Resolver.Tags[input.ID]

	if !ok {
		return nil, nil
	}

	tag.Name = input.Name
	r.Resolver.Tags[input.ID] = tag

	return &tag, nil
}

func (r *queryResolver) Tags(ctx context.Context) ([]Tag, error) {
	var tags []Tag

	for _, value := range r.Resolver.Tags {
		tags = append(tags, value)
	}

	return tags, nil
}

/*
	Interesting example
	query {
	  search(text: "Jeff") {
		__typename
		... on User {
		  id
		  name
		}
		... on Todo {
		  id
		  text
		  done
		}
		... on Tag {
		  id
		  name
		}
	  }
	}
*/

func (r *queryResolver) Search(ctx context.Context, text string) ([]SearchResult, error) {
	var result []SearchResult

	for _, value := range r.Resolver.Users {
		if strings.Contains(value.Name, text) {
			result = append(result, value)
		}
	}

	for _, value := range r.Resolver.Tags {
		if strings.Contains(value.Name, text) {
			result = append(result, value)
		}
	}

	for _, value := range r.Resolver.Todos {
		if strings.Contains(value.Text, text) {
			result = append(result, value)
		}
	}

	return result, nil
}

func GenerateUUID() string {
	return uuid.NewV4().String()
}

func FieldLogging(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	rc := graphql.GetResolverContext(ctx)
	log.Printf("field logging: %v, %s, %T, %+v", rc.Path(), rc.Field.Name, obj, obj)
	return next(ctx)
}