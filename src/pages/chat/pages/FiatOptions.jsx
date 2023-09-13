// import {
//   RUB,
//   USD,
//   EUR,
//   GBP,
//   // usdt,
// } from './assets/img/payOptions';

export default function FiatOptions({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('USD')}
          name="USD"
          onChange={handleCbClick}
        />
        <img
          src="/usd.png"
          alt="star"
          className="w-7 h-7 object-contain rounded-lg"
        />
        <span>USD</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('EUR')}
          name="EUR"
          onChange={handleCbClick}
        />
        <img
          src="/euro.png"
          alt="star"
          className="w-10 h-10 object-contain rounded-lg"
        />
        <span>EUR</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('GBP')}
          name="GBP"
          onChange={handleCbClick}
        />
        <img
          src="/gbp.png"
          alt="star"
          className="w-6 h-6 object-contain rounded-lg"
        />
        <span>GBP</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('RUB')}
          name="RUB"
          onChange={handleCbClick}
        />
        <img
          src="/rub.png"
          alt="star"
          className="w-12 h-12 object-contain rounded-lg"
        />
        <span>RUB</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('AUD')}
          name="AUD"
          onChange={handleCbClick}
        />
        <img
          src="/aud.png"
          alt="star"
          className="w-12 h-12 object-contain rounded-lg"
        />
        <span>AUD</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('AED')}
          name="AED"
          onChange={handleCbClick}
        />
        <img
          src="/aed.png"
          alt="star"
          className="w-12 h-12 object-contain rounded-lg"
        />
        <span>AED</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('CAD')}
          name="CAD"
          onChange={handleCbClick}
        />
        <img
          src="/cad.png"
          alt="star"
          className="w-12 h-12 object-contain rounded-lg"
        />
        <span>CAD</span>
      </label>
    </>
  );
}
