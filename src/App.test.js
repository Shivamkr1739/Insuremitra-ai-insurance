import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders InsureMitra chatbot title', () => {
  render(<App />);
  const titleElement = screen.getByText(/insuremitra/i);
  expect(titleElement).toBeInTheDocument();
});

test('user can send message to chatbot and see bot reply', async () => {
  render(<App />);

  // Type a message in the chatbot input
  const input = screen.getByPlaceholderText(/ask in hindi or english/i);
  fireEvent.change(input, { target: { value: 'Hi Mitra' } });

  // Click the send button
  const sendButton = screen.getByText(/send/i);
  fireEvent.click(sendButton);

  // Check if user's message appears
  expect(screen.getByText(/hi mitra/i)).toBeInTheDocument();

  // Wait for bot's response
  const botReply = await screen.findByText(/recommended/i);
  expect(botReply).toBeInTheDocument();
});
