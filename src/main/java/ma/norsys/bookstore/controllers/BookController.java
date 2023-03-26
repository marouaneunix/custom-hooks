package ma.norsys.bookstore.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ma.norsys.bookstore.entities.Book;
import ma.norsys.bookstore.services.BookService;

@RestController
@RequestMapping(value = "api/v1/books")
@CrossOrigin(origins = "*")
public class BookController {
	@Autowired
	private BookService bookService;

	@PostMapping
	public ResponseEntity<Book> create(@RequestBody Book book) {
		return new ResponseEntity<Book>(bookService.create(book), HttpStatus.CREATED);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Book> getById(@PathVariable(value = "id") Long id) {
		Book book = bookService.getById(id);
		return new ResponseEntity<>(book, HttpStatus.FOUND);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteById(@PathVariable(value = "id") Long id) {
		bookService.delete(id);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping(value = "/search")
	public ResponseEntity<List<Book>> searchByCategoriesAndTitles(@RequestParam(value = "categories", required = false) String categories,
            @RequestParam(value = "titles", required = false) String titles) {
		try {
			return new ResponseEntity<>(bookService.search(categories, titles), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<List<Book>> getAll() {
		try {
			return new ResponseEntity<>(bookService.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}