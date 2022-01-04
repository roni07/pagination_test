import React from 'react';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import Details from "../components/pages/Details";
import {createMemoryHistory} from 'history';

test('Render details component', () => {

    const history = createMemoryHistory();
    history.push("/details", {title: "", url: "", created_at: Date(), author: ""});

    render(
        <Router history={history}>
            <Details/>
        </Router>
    );
    const details = screen.getByTestId("details");
    expect(details).toBeInTheDocument();
});
