let allAthletes = [];
let editIndex = -1;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('saveChangesBtn').addEventListener('click', saveAthlete);
});

function register() {
    let athlete = document.getElementById('athlete').value;
    let gender = document.getElementById('gender').value;
    let sport = document.getElementById('sport').value;
    let country = document.getElementById('country').value;

    if (athlete === '' || gender === '' || sport === '' || country === '') {
        document.getElementById('errorMsg').style.display = 'block';
    } else {
        document.getElementById('errorMsg').style.display = 'none';
        let person = { athlete, gender, sport, country };

        if (editIndex === -1) {
            allAthletes.push(person);
        } else {
            allAthletes[editIndex] = person;
            editIndex = -1;
        }

        document.getElementById('athlete').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('sport').value = '';
        document.getElementById('country').value = '';

        showAthletes();
    }
}

function clearAthlete(i) {
    if (confirm('Proceed to delete?')) {
        allAthletes.splice(i, 1);
        showAthletes();
    }
}

function editAthlete(i) {
    let athlete = allAthletes[i];
    document.getElementById('athleteModal').value = athlete.athlete;
    document.getElementById('genderModal').value = athlete.gender;
    document.getElementById('sportModal').value = athlete.sport;
    document.getElementById('countryModal').value = athlete.country;
    editIndex = i;
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

function saveAthlete() {
    if (editIndex !== -1) {
        let athlete = {
            athlete: document.getElementById('athleteModal').value,
            gender: document.getElementById('genderModal').value,
            sport: document.getElementById('sportModal').value,
            country: document.getElementById('countryModal').value
        };
        allAthletes[editIndex] = athlete;
        editIndex = -1;
        let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
        showAthletes();
    }
}

function showAthletes() {
    let show = document.getElementById('show');
    let athletesSection = document.getElementById('athletes');
    show.innerHTML = '';
    if (allAthletes.length > 0) {
        athletesSection.style.display = 'block';
        for (let i = 0; i < allAthletes.length; i++) {
            show.innerHTML += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${allAthletes[i].athlete}</td>
                <td>${allAthletes[i].gender}</td>
                <td>${allAthletes[i].sport}</td>
                <td>${allAthletes[i].country}</td>
                <td>
                    <button class="btn btn-danger" onclick="clearAthlete(${i})">Delete</button>
                    <button class="btn btn-warning" onclick="editAthlete(${i})">Edit</button>
                </td>
            </tr>`;
        }
    } else {
        athletesSection.style.display = 'none';
    }
}
