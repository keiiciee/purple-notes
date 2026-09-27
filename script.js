let notes = [];

try {
    notes = JSON.parse(localStorage.getItem("purpleNotes")) || [];
} catch (error) {
    notes = [];
}


/* CREATE NEW NOTE */

function createNote() {

    let title = prompt("Note title:");

    if (title === null || title.trim() === "") {
        return;
    }

    let content = prompt("Write your note:");

    if (content === null || content.trim() === "") {
        return;
    }

    notes.unshift({
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        pinned: false
    });

    saveNotes();
    displayNotes();
}


/* DISPLAY NOTES */

function displayNotes(noteList = notes) {

    let list = document.getElementById("notesList");

    list.innerHTML = "";

    if (noteList.length === 0) {
        list.innerHTML =
            '<p class="empty">No notes yet 💜</p>';
        return;
    }

    noteList.forEach(function(note) {

        let noteElement = document.createElement("div");

        noteElement.className = "note";

        noteElement.innerHTML = `
            <h2>${note.pinned ? "📌 " : ""}${note.title}</h2>

            <p>${note.content}</p>

            <div class="note-buttons">

                <button onclick="pinNote(${note.id})">
                    ${note.pinned ? "Unpin" : "Pin"}
                </button>

                <button onclick="editNote(${note.id})">
                    Edit
                </button>

                <button onclick="deleteNote(${note.id})">
                    Delete
                </button>

            </div>
        `;

        list.appendChild(noteElement);
    });
}


/* PIN NOTE */

function pinNote(id) {

    let note = notes.find(function(note) {
        return note.id === id;
    });

    if (!note) return;

    note.pinned = !note.pinned;

    notes.sort(function(a, b) {
        return b.pinned - a.pinned;
    });

    saveNotes();
    displayNotes();
}


/* EDIT NOTE */

function editNote(id) {

    let note = notes.find(function(note) {
        return note.id === id;
    });

    if (!note) return;

    let newTitle = prompt("Edit title:", note.title);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    let newContent = prompt("Edit note:", note.content);

    if (newContent === null || newContent.trim() === "") {
        return;
    }

    note.title = newTitle.trim();
    note.content = newContent.trim();

    saveNotes();
    displayNotes();
}


/* DELETE NOTE */

function deleteNote(id) {

    let confirmDelete =
        confirm("Delete this note?");

    if (!confirmDelete) {
        return;
    }

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    saveNotes();
    displayNotes();
}


/* SEARCH */

function searchNotes() {

    let search =
        document.getElementById("searchInput").value.toLowerCase();

    let filteredNotes = notes.filter(function(note) {

        return (
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search)
        );

    });

    displayNotes(filteredNotes);
}


/* SAVE NOTES */

function saveNotes() {

    try {
        localStorage.setItem(
            "purpleNotes",
            JSON.stringify(notes)
        );
    } catch (error) {
        console.log("Storage unavailable.");
    }
}


/* LOAD NOTES */

displayNotes();
