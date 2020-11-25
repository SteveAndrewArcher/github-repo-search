import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import GithubSearchApp from 'components/GithubSearchApp';

test('renders search bar', () => {
    render(<GithubSearchApp />);
    const searchElement = screen.getByRole("textbox");
    expect(searchElement).toBeInTheDocument();
});

test('calls fetch once on user input, after debounce delay', () => {
    jest.useFakeTimers();
    render(<GithubSearchApp />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, "facebook");

    // wait for debounce to complete
    act(() => {
        jest.advanceTimersByTime(501);
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/search/repositories?q=user:facebook&sort=stars&page=1&per_page=10')
})


// TODO: With more time, I'd add lots more tests, showing that the dom behaves as expected
// using makced fetch responses. Something's wrong with the mock response in the test below, but I'm stumped for now

// test('renders results on successful search', () => {
//     jest.useFakeTimers();
//     fetch.mockResponse(JSON.stringify({"items": [{name: "react"}]}))
//     render(<GithubSearchApp />);
//     const inputElement = screen.getByRole("textbox")
//     act(() => {
//         userEvent.type(inputElement, "facebook")
//     })

//     // wait for debounce to complete
//     act(() => {
//         jest.advanceTimersByTime(30000);
//     })

//     const results = screen.getAllByRole("link")
// })
