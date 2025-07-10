const { todoTitleValidate } = require("../validate/todoValidate");
const todoService = require("../services/todoService");

// GET/ todos
exports.getTodos = async (req, res) => {
    try {
        console.log("GET /todos", "OWNER:", req.user.owner, "QUERY:", req.query);
        const result = await todoService.getTodos(req.user.owner, req.query);
        res.json(result);
    }
    catch (error) {
        console.error("getTodos HATASI:", err);
        res.status(500).json({ error: "Sunucu hatası !!" });
    }
};

// POST/ todos
exports.createTodo = async (req, res) => {
      console.log("POST /todos", "BODY:", req.body, "OWNER:", req.user.owner);
    const { error } = todoTitleValidate(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const newTodo = await todoService.createTodo({
            title:req.body.title, 
            owner:req.user.owner});
        res.status(201).json(newTodo);
    }
    catch (error) {
         console.error("createTodo HATASI:", error);
        res.status(500).json({ error: error.message});
    }
};

// PUT/ todos/:id
exports.updateTodo = async (req, res) => {
     console.log("PUT /todos/:id", "ID:", req.params.id, "OWNER:", req.user.owner, "BODY:", req.body);
    const { error } = todoTitleValidate(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const updatedTodo = await todoService.updateTodo(req.params.id, req.user.owner, req.body.title);
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo bulunmadı!" });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error("updateTodo HATASI:", err);
        res.status(500).json({ error: "Sunucu hatası !!" });
    }
}

//DELETE/ todos/:id
exports.deleteTodo = async (req, res) => {

    try {
        console.log("DELETE /todos/:id", "ID:", req.params.id, "OWNER:", req.user.owner);
        const deletedTodo = await todoService.deleteTodo(req.params.id, req.user.owner);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo bulunmadı !" });
        }
        res.json({ message: "Todo silindi." });
    } catch (error) {
        console.error("deleteTodo HATASI:", err);
        res.status(500).json({ error: "Sunucu hatası !!" });
    }
};

//PATCH/ todos/:id/complete
exports.toggleComplete = async (req, res) => {
    try {
          console.log("ID:", req.params.id, "OWNER:", req.user.owner);
        
        const todo = await todoService.toggleComplete(req.params.id, req.user.owner);
        if (!todo) {
            return res.status(404).json({ error: "Todo bulunmadı !" });
        }
        res.json(todo);
    } catch (error) {
         console.error("toggleComplete hata:", error);
        res.status(500).json({ error: "Sunucu hatası !!" });
    }
}












