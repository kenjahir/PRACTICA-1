const userCard = document.getElementById('user-card');
const refreshBtn = document.getElementById('refresh-btn');

async function fetchUser() {
  userCard.innerHTML = 'Cargando... ⏳';
  try {
    const res = await fetch('https://randomuser.me/api/');
    if (!res.ok) throw new Error('Respuesta no OK');
    const data = await res.json();
    const user = data.results[0];

    userCard.innerHTML = `
      <img src="${user.picture.large}" alt="Foto de ${user.name.first}" />
      <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
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
