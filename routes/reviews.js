
@swagger
tags:
openapi: 3.0.0
info:
  title: Moview Review API
  version: 1.0.0
  description: API documentation for Movie review (Express.js)

servers:
  - url: http://localhost:3000/api
    description: Local server

paths:

  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User data

  /users/{id}/reviews:
    get:
      summary: Get reviews by user
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: List of reviews

  /movies:
    get:
      summary: Get movie list
      parameters:
        - in: query
          name: genre
          schema: { type: string }
        - in: query
          name: q
          schema: { type: string }
      responses:
        '200':
          description: Movie list

    post:
      summary: Add a new movie
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title: { type: string }
                poster_url: { type: string }
                description: { type: string }
                release_date: { type: string, format: date }
                genre: { type: string }
                director: { type: string }
      responses:
        '201':
          description: Movie created

  /movies/{id}:
    get:
      summary: Get movie detail
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: Movie detail

  /movies/{id}/reviews:
    get:
      summary: Get reviews for a movie
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: List of reviews

    post:
      summary: Add a review to a movie
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                rating: { type: integer, minimum: 1, maximum: 5 }
                content: { type: string }
                is_critic: { type: boolean }
      responses:
        '201':
          description: Review created

  /reviews/{id}:
    put:
      summary: Update a review
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                rating: { type: integer }
                content: { type: string }
      responses:
        '200':
          description: Review updated

    delete:
      summary: Delete a review
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '204':
          description: Review deleted

  /movies/{id}/ratings:
    get:
      summary: Get average ratings of a movie
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: Average rating data

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
