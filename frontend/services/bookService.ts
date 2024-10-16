const API_URL = `http://localhost:9000/api/books`;

export const createBook = async (book: any) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar o livro");
    }

    return response.json();
};

export const updateBook = async (id: string, book: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar o livro");
    }

    return response.json();
};

export const deleteBook = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir o livro");
    }

    return response.json();
};
