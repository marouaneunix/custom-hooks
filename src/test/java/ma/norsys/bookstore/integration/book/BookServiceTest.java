package ma.norsys.bookstore.integration.book;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import jakarta.transaction.Transactional;
import ma.norsys.bookstore.entities.Book;
import ma.norsys.bookstore.repositories.BookRepository;
import ma.norsys.bookstore.services.BookService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BookServiceTest {
	@Autowired
	private BookService bookService;

	@Autowired
	private BookRepository bookRepository;

	private List<Book> books;

	@BeforeEach
	void setUp() {
		books.addAll(Arrays.asList(new Book(1L, "title1", "description1", "author1", "category1"),
				new Book(2L, "title2", "description2", "author2", "category2"),
				new Book(3L, "title3", "description3", "author3", "category3")));
	}

	@Test
	// search with categories and titles
	public void testSearchWithCategoriesAndTitles() {
		bookRepository.saveAll(books);

		List<Book> result = bookService.search("category1", "title1,title2");

		assertEquals(2, result.size());
		assertTrue(result.contains(books.get(0)));
		assertTrue(result.contains(books.get(1)));
	}

	@Test
	// search with categories only
	public void testSearchWithCategoriesOnly() {
		bookRepository.saveAll(books);

		List<Book> result = bookService.search("category1,category2", null);

		assertEquals(2, result.size());
		assertTrue(result.contains(books.get(0)));
		assertTrue(result.contains(books.get(1)));
	}

	@Test
	// search with titles only
	public void testSearchWithTitlesOnly() {
		bookRepository.saveAll(books);

		List<Book> result = bookService.search(null, "title1,title2");

		assertEquals(2, result.size());
		assertTrue(result.contains(books.get(0)));
		assertTrue(result.contains(books.get(1)));
	}

	@Test
	// search with no categories and no titles
	public void testSearchWithNoParameters() {
		bookRepository.saveAll(books);

		List<Book> result = bookService.search(null, null);

		assertEquals(3, result.size());
		assertTrue(result.contains(books.get(0)));
		assertTrue(result.contains(books.get(1)));
		assertTrue(result.contains(books.get(2)));
	}
}
