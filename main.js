const { createStore } = window.Redux

const initState = [
    'Read book',
]


const hobbyReducer = (state = initState, action ) => {
    switch(action.type) {
        case 'ADD_HOBBY' : {
            const newList = [...state]
            return [...newList, action.payload]
        }
        default: 
        return state
    }
}

const store = createStore(hobbyReducer)

const renderUI = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector('#myHobbiesId')

    ulElement.innerHTML = ''

    for (let i = 0; i < hobbyList.length; i++) {
        const liElement = document.createElement('li')
        liElement.textContent = hobbyList[i]
        ulElement.appendChild(liElement)
    }
}

const initialHobbylist = store.getState()

renderUI(initialHobbylist)

const hobbyFormElement = document.querySelector('#hobbyFormId')

if (hobbyFormElement) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const inputTextElement = hobbyFormElement.querySelector('#hobbyTextId')
        if (!inputTextElement) return
        const action = {
            type: 'ADD_HOBBY',
            payload: inputTextElement.value
        }
        store.dispatch(action)
        hobbyFormElement.reset()
    }

    hobbyFormElement.addEventListener('submit', handleSubmit)
}

store.subscribe(() => {
    const newList = store.getState()
    renderUI(newList)
})