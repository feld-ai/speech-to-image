package api

import "github.com/gin-gonic/gin"

type Server struct {
	router *gin.Engine
}

func NewServer() *Server {
	server := &Server{}

	router := gin.Default()

	router.POST("/login", server.login)

	server.router = router
	return server

}
