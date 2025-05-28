import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodo } from './api/todoApi';

const App = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['todo'],
        queryFn: getTodo,
    });

    return (
        <div>
            {isPending && <h1>Loading...</h1>}
            {isError && <h1>Error fetching todo.</h1>}

            {data?.data?.map((el) => (
                <div key={el._id}>
                    <h2>{el.title}</h2>
                    <h4>{el._id}</h4>
                    <h4>{String(el.completed)}</h4>
                </div>
            ))}
        </div>
    );
};

export default App;