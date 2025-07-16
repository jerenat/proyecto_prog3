function Footer() {
  return (
    <footer className="w-full py-4 px-8 mt-4">
      <ul className="w-full flex flex-row justify-end items-center gap-5">
        <li>
          <a className="font-extralight text-[0.8rem] text-white/60" href="https://www.canva.com/es_es/politicas-legales/privacy-policy/">
            Politica de Privacidad
          </a>
        </li>
        <li>
          <a className="font-extralight text-[0.8rem] text-white/60" href="https://www.canva.com/es_es/politicas-legales/terms-of-use/">
            Condiciones
          </a>
        </li>
        <li>
          <select name="translate" id="translate" className="bg-gray-800 tex-white py-2 px-5 rounded-lg outline-0 outline-none">
            <option value="es-ar">Español (AR)</option>
            <option value="en-us">English (UK)</option>
          </select>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
