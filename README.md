# Bookly

Bookly is a frontend example project designed to showcase a simple book management application. This project demonstrates the use of modern web development technologies to create a responsive and user-friendly interface. 

## Live Website
 
- https://booklymangerapp.netlify.app/author

## Features

- Add new books with title, author, and description
- Edit existing book details
- Delete books from the list
- View a list of all books
- Responsive design for mobile and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- React.js

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/aliberkayberber/Bookly
    ```
2. Navigate to the project directory:
    ```sh
    cd bookly
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:8080`.

## API Endpoints

### Books

- `GET /api/books`: List all books
- `GET /api/books/{id}`: Fetch book details
- `POST /api/books`: Adding a new book
- `PUT /api/books/{id}`: Updating book information
- `DELETE /api/books/{id}`: Deleting a book

### Authors

- `GET /api/authors`: List all authors
- `GET /api/authors/{id}`: Fetch book details
- `POST /api/authors`: Adding a new author
- `PUT /api/authors/{id}`: Updating book information
- `DELETE /api/authors/{id}`: Deleting a author

### Publisher

- `GET /api/publishers`: List all publishers
- `GET /api/publishers/{id}`: Fetch book publisher
- `POST /api/publishers`: Adding a new publisher
- `PUT /api/publishers/{id}`: Updating publisher information
- `DELETE /api/publishers/{id}`: Deleting a publisher

### Categories

- `GET /api/categories`: List all categories
- `GET /api/categories/{id}`: Fetch book category
- `POST /api/categories`: Adding a new category
- `PUT /api/categories/{id}`: Updating category information
- `DELETE /api/categories/{id}`: Deleting a category

### Book Borrow

- `GET /api/borrows`: List all borrows
- `GET /api/borrows/{id}`: Fetch book borrow
- `POST /api/borrows`: Adding a new borrow
- `PUT /api/borrows/{id}`: Updating borrow information
- `DELETE /api/borrows/{id}`: Deleting a borrow

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact the project maintainer at [aliberkayberber@gmail.com].
