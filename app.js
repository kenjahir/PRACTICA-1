const userCard = document.getElementById('user-card');
const refreshBtn = document.getElementById('refresh-btn');

const titulos = {
  "Mr": "Sr.",
  "Mrs": "Sra.",
  "Ms": "Srta.",
  "Miss": "Srta.",
  "Dr": "Dr.",
};

async function fetchUser() {
  userCard.innerHTML = 'Cargando... ⏳';
  try {
    const url = `https://api.allorigins.win/raw?url=https://randomuser.me/api/?nat=es,mx&timestamp=${new Date().getTime()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Respuesta no OK');
    const data = await res.json();
    const user = data.results[0];

    const tituloTraducido = titulos[user.name.title] || user.name.title;

    userCard.innerHTML = `
      <img src="${user.picture.large}" alt="Foto de ${user.name.first}" />
      <h2>${tituloTraducido} ${user.name.first} ${user.name.last}</h2>
      <p><strong>Correo electrónico:</strong> ${user.email}</p>
      <p><strong>Ciudad:</strong> ${user.location.city}, ${user.location.country}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
    `;
  } catch (error) {
    console.error('Error fetching user:', error);
    userCard.innerHTML = 'Error al cargar usuario. 😵‍💫';
  }
}

refreshBtn.addEventListener('click', fetchUser);
fetchUser();