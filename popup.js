document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

function saveOptions() {
  const sites = document.getElementById('sites').value.split(',').map(s => s.trim());
  const timezone = document.getElementById('timezone').value.trim();
  const latitude = parseFloat(document.getElementById('latitude').value);
  const longitude = parseFloat(document.getElementById('longitude').value);
  const locale = document.getElementById('locale').value.trim();
  const userAgent = document.getElementById('userAgent').value.trim();

  const settings = {
    sites,
    timezone,
    locale,
    latitude,
    longitude,
    userAgent
  };

  chrome.storage.local.set({ config: settings }, () => {
    alert('Настройки сохранены!');
  });
}

function restoreOptions() {
  chrome.storage.local.get(['config'], (result) => {
    if (result.config) {
      document.getElementById('sites').value = result.config.sites.join(', ');
      document.getElementById('timezone').value = result.config.timezone || '';
      document.getElementById('latitude').value = result.config.latitude || '';
      document.getElementById('longitude').value = result.config.longitude || '';
      document.getElementById('locale').value = result.config.locale || '';
      document.getElementById('userAgent').value = result.config.userAgent || '';
    }
  });
}
