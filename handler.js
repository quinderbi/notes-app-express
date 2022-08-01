const { nanoid } = require("nanoid");

const notes = require("./notes");

const addNodeHandler = (req, res) => {
    const { title, tags, body } = req.body;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNode = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    notes.push(newNode);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        res.json({
            status: "success",
            messege: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        });
    } else {
        res.json({
            status: "fail",
            messege: "Catatan gagal ditambahkan",
        });
    }
};

const getAllNodeHandler = (req, res) => {
    res.json({
        status: "success",
        data: {
            notes: notes,
        },
    });
};

const getNoteHandler = (req, res) => {
    const { id } = req.params;
    const note = notes.filter((note) => note.id === id);
    if (note.length > 0) {
        res.json({
            status: "success",
            data: {
                note: note[0],
            },
        });
    } else {
        res.json({
            status: "error",
            message: "note not found",
        });
    }
};

const updateNodeHandler = (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;

    const note = notes.filter((note) => note.id === id);

    if (note.length > 0) {
        note[0].title = title;
        note[0].tags = tags;
        note[0].body = body;
        note[0].updatedAt = new Date().toISOString();
        res.json({
            status: "success",
            messege: "Catatan berhasil diubah",
            data: {
                note: note[0],
            },
        });
    } else {
        res.json({
            status: "fail",
            messege: "Catatan tidak ditemukan",
        });
    }
};

const deleteNodeHandler = (req, res) => {
    const { id } = req.params;

    const note = notes.filter((note) => note.id === id);

    if (note.length > 0) {
        notes.splice(notes.indexOf(note[0]), 1);
        res.json({
            status: "success",
            messege: "Catatan berhasil dihapus",
        });
    } else {
        res.json({
            status: "fail",
            messege: "Catatan tidak ditemukan",
        });
    }
};

module.exports = { addNodeHandler, getAllNodeHandler, getNoteHandler, updateNodeHandler, deleteNodeHandler };
