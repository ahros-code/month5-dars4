import { useState } from 'react';

const Todos = () => {
	const [newTodo, setNewTodo] = useState('');
	const [editingTodo, setEditingTodo] = useState(null);
	const [buttonText, setButtonText] = useState('Submit');

	const [todos, setTodos] = useState(() => {
		const storedTodo = localStorage.getItem('todos');
		return storedTodo ? JSON.parse(storedTodo) : [];
	});

	const handleNewTodoChange = e => {
		setNewTodo(e.target.value);
	};

	const handleNewTodoSubmit = e => {
		e.preventDefault();

		if (!newTodo.trim()) return;

		if (editingTodo !== null) {
			const updateTodo = todos.map(todo => {
				if (todo.id === editingTodo) {
					return { ...todo, text: newTodo };
				} else {
					return todo;
				}
			});
			setNewTodo(updateTodo)
			setEditingTodo(null)
			setNewTodo('');
			setButtonText('Submit')
		}

		setTodos([...todos, { id: Date.now(), text: newTodo }]);

		setNewTodo('');
	};

	localStorage.setItem('todos', JSON.stringify(todos));

	const handleTodoDelete = id => {
		const updateTodos = todos.filter(item => item.id != id);
		setTodos(updateTodos);
	};

	const handleEditTodo = (id) => {
		const todoEdit = todos.find((todo) => todo.id === id)
		setEditingTodo(id);
		setNewTodo(todoEdit.text)
		setButtonText('Save')
	}

	return (
		<div>
			<h1>To Do List</h1>
			<form onSubmit={handleNewTodoSubmit}>
				<label>
					Name:
					<input type='text' value={newTodo} onChange={handleNewTodoChange} />
				</label>
				<button type='submit'>{buttonText}</button>
				{
					editingTodo !== null && (
						<button type='button' onClick={() => setEditingTodo(null)}>Cancel</button>
					)
				}
			</form>
			<ul>
				{todos.map(el => (
					<li key={el.id}>
						<span>{el.text}</span>
						<button onClick={() => handleTodoDelete(el.id)}>Delete</button>
						<button onClick={() => handleEditTodo(el.id)}>Edit</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todos;
