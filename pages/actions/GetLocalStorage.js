import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export default function Todos() {
    const [todos, setTodos, isPersistent] = useLocalStorageState('todos', ['buy milk'])

    return (
        <>
            {todos.map(todo => (<div>{todo}</div>))}
            {!isPersistent && <span>Changes aren't currently persisted.</span>}
        </>
    )
}