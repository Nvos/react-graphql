package backend

import (
	client2 "github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/handler"
	"github.com/stretchr/testify/require"
	"net/http/httptest"
	"testing"
)

func TestResolver(t *testing.T) {
	config := New()
	server := httptest.NewServer(handler.GraphQL(NewExecutableSchema(config)))
	client := client2.New(server.URL)

	t.Run("Find Tags", func(t *testing.T) {
		var response struct {
			Tags []Tag
		}
		expected := Tag{
			ID: "7a0bd056-7845-4250-89bc-84c9df362674",
			Name: "TBD Jeff",
		}
		client.MustPost(`
			query Tags {
        		tags {
            		id
            		name
        		}
			}
		`, &response)

		require.Equal(t, response.Tags[0], expected)
	})
}
