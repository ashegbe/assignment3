

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.events .card');

    
    if (cards.length === 0) {
        return;
    }

   
    const eventDetails = {
        'Game nights': { date: 'Tentative', time: 'Tentative', location: 'Pool Room' },
        'Coding Labs': { date: 'Tentative', time: 'Tentative', location: 'Computer Lab' },
        'Networking': { date: 'Tentative', time: 'Tentative', location: 'Alumni Center' },
        'Disco Nights': { date: 'Tentative', time: 'Tentative', location: 'Ball Room' },
        'Book fairs': { date: 'Tentative', time: 'Tentative', location: 'Ballroom' }
    };

   
    const savedSection = document.createElement('section');
    savedSection.classList.add('saved-events-section');
    savedSection.id = 'saved-events';

    const savedHeading = document.createElement('h2');
    savedHeading.textContent = 'Saved Events';
    savedSection.appendChild(savedHeading);

    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('no-saved-events');
    emptyMessage.textContent = 'No events have been saved yet.';
    savedSection.appendChild(emptyMessage);

    const savedList = document.createElement('ul');
    savedList.classList.add('saved-events-list');
    savedSection.appendChild(savedList);

   
    const aboutSection = document.getElementById('about');
    if (aboutSection && aboutSection.parentNode) {
        aboutSection.parentNode.insertBefore(savedSection, aboutSection.nextSibling);
    } else {
        document.querySelector('main').appendChild(savedSection);
    }

    const savedItems = new Map();

    function updateEmptyMessage() {
        emptyMessage.classList.toggle('hidden', savedList.children.length > 0);
    }

    function buildSavedListItem(title, details) {
        const li = document.createElement('li');
        li.classList.add('saved-event-item');

        const nameEl = document.createElement('strong');
        nameEl.classList.add('saved-event-name');
        nameEl.textContent = title;

        const detailEl = document.createElement('p');
        detailEl.classList.add('saved-event-detail');
        detailEl.textContent = `${details.date}, ${details.time} — ${details.location}`;

        li.appendChild(nameEl);
        li.appendChild(detailEl);

        return li;
    }

   
    cards.forEach((card) => {
        const titleEl = card.querySelector('h2');
        const title = titleEl ? titleEl.textContent.trim() : 'Event';

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.classList.add('cta-button', 'save-event-btn');
        saveBtn.textContent = 'Save Event';
        card.appendChild(saveBtn);

        saveBtn.addEventListener('click', () => {
            const alreadySaved = card.classList.contains('saved-event');

            if (!alreadySaved) {
               
                card.classList.add('saved-event');
                saveBtn.textContent = 'Remove Event';

                const details = eventDetails[title] || { date: 'Tentative', time: 'Tentative', location: 'Tentative' };
                const li = buildSavedListItem(title, details);
                savedList.appendChild(li);
                savedItems.set(card, li);
            } else {
                
                card.classList.remove('saved-event');
                saveBtn.textContent = 'Save Event';

                const li = savedItems.get(card);
                if (li) {
                    savedList.removeChild(li);
                    savedItems.delete(card);
                }
            }

            updateEmptyMessage();
        });
    });

    updateEmptyMessage();
});