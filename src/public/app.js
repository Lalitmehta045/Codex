const form = document.querySelector('#auth-form');
const tabs = document.querySelectorAll('.tab');
const nameRow = document.querySelector('#name-row');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#submit-button');
const output = document.querySelector('#response-output');
const meButton = document.querySelector('#me-button');
const clearButton = document.querySelector('#clear-button');

let mode = 'login';

const setOutput = (data, type = 'success') => {
  output.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  output.classList.remove('success', 'error');
  output.classList.add(type);
};

const setMode = (nextMode) => {
  mode = nextMode;
  const isRegister = mode === 'register';

  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  nameRow.hidden = !isRegister;
  nameInput.required = isRegister;
  submitButton.textContent = isRegister ? 'Create account' : 'Sign in';
};

const callApi = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || 'Something went wrong');
  }

  return payload;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const body = {
    email: emailInput.value.trim(),
    password: passwordInput.value,
  };

  if (mode === 'register') {
    body.name = nameInput.value.trim();
  }

  try {
    const endpoint = mode === 'register' ? '/api/v1/auth/register' : '/api/v1/auth/login';
    const payload = await callApi(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (payload?.data?.token) {
      localStorage.setItem('authToken', payload.data.token);
    }

    setOutput(payload, 'success');
  } catch (error) {
    setOutput(error.message, 'error');
  }
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setMode(tab.dataset.mode));
});

meButton.addEventListener('click', async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    setOutput('No token found. Login first.', 'error');
    return;
  }

  try {
    const payload = await callApi('/api/v1/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOutput(payload, 'success');
  } catch (error) {
    setOutput(error.message, 'error');
  }
});

clearButton.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  setOutput('Token cleared from local storage.', 'success');
});
