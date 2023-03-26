package ma.norsys.bookstore.services;

import java.util.List;

import ma.norsys.bookstore.entities.Book;

public interface BookService {
	public Book create(Book book);

	public void delete(Long id);

	public Book getById(Long id);

	public List<Book> searchByTitles(String titles);

	public List<Book> searchByCategories(String categories);

	public List<Book> search(String categories, String titles);

	public List<Book> getAll();
}
