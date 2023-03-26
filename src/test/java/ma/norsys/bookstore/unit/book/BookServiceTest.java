package ma.norsys.bookstore.unit.book;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import ma.norsys.bookstore.entities.Book;
import ma.norsys.bookstore.repositories.BookRepository;
import ma.norsys.bookstore.services.BookServiceImpl;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

	@Mock
	private BookRepository bookRepository;

	@InjectMocks
	private BookServiceImpl bookService;

	private List<Book> books;

	@BeforeEach
	void setUp() {
		books = new ArrayList<>();
		books.add(new Book(1L, "title1", "description1", "author1", "category1"));
		books.add(new Book(2L, "title2", "description2", "author2", "category1,category2"));
		books.add(new Book(3L, "title3", "description3", "author3", "category2"));
	}

	@Test
	// search with categories and titles
	void testSearchByCategoriesAndTitles() {
		when(bookRepository.findByCategoriesContainingAndTitleContaining(anyString(), anyString())).thenReturn(books.subList(0, 2));

	    List<Book> result = bookService.search("category1,category2", "title1,title2");

	    assertEquals(2, result.size());
	    assertTrue(result.contains(books.get(0)));
	    assertTrue(result.contains(books.get(1)));
	}

	@Test
	// search with categories only
	void testSearchByCategoriesOnly() {
		when(bookRepository.findByCategoriesContaining(anyString()))
				.thenReturn(Arrays.asList(books.get(0), books.get(1)));

		List<Book> result = bookService.search("category1", null);

		assertThat(result).containsExactly(books.get(0), books.get(1));
		verify(bookRepository).findByCategoriesContaining("category1");
		verify(bookRepository, times(1)).findByCategoriesContaining(anyString());
	}

	@Test
	// search with titles only
	void testSearchByTitlesOnly() {
		when(bookRepository.findByTitleContaining(anyString())).thenReturn(Arrays.asList(books.get(0), books.get(1)));

		List<Book> result = bookService.search(null, "title1,title2");

		assertThat(result).containsExactly(books.get(0), books.get(1));
		verify(bookRepository).findByTitleContaining("title1");
		verify(bookRepository).findByTitleContaining("title2");
		verify(bookRepository, times(2)).findByTitleContaining(anyString());
	}

	@Test
	// search with no categories and no titles
	void testSearchWithNoCategoriesAndTitles() {
		when(bookRepository.findAll()).thenReturn(books);
		List<Book> result = bookService.search(null, null);

		assertEquals(3, result.size());
        assertTrue(result.containsAll(books));
	}
}