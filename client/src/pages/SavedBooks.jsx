import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import AuthService from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "network-only"
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: (data) => {
      removeBookId(data.deleteBook.bookId);
      window.location.reload();
    }
  });

  const handleDeleteBook = (bookId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  
    if (!token) {
      return false;
    }
  
    deleteBook({
      variables: { bookId }, // Corrected to pass bookId directly
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  };
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data.me;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
