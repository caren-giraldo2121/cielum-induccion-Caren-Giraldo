"""
Ejercicio intermedio: bot Playwright que llena un formulario publico de practica
y toma capturas antes y despues de enviarlo.

Sitio: https://www.selenium.dev/selenium/web/web-form.html (pagina oficial de
pruebas de Selenium, hecha justamente para practicar automatizacion).

Uso:  python ejercicios/formulario_practica.py
"""
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

URL = "https://www.selenium.dev/selenium/web/web-form.html"
CAPTURAS = Path(__file__).resolve().parent.parent / "capturas"


def main():
    CAPTURAS.mkdir(exist_ok=True)
    with sync_playwright() as pw:
        navegador = pw.chromium.launch(headless=False, slow_mo=300)
        page = navegador.new_page()
        page.goto(URL)

        page.fill("#my-text-id", "Caren Giraldo")
        page.fill("input[name=my-password]", "Cielum2026*")
        page.fill("textarea[name=my-textarea]", "Formulario llenado por un bot de Playwright - induccion Cielum")
        page.select_option("select[name=my-select]", "2")
        page.fill("input[name=my-datalist]", "Seattle")
        page.check("#my-check-2")
        page.check("#my-radio-2")
        page.fill("input[name=my-date]", "10/21/2026")
        page.keyboard.press("Escape")  # cierra el calendario

        page.screenshot(path=str(CAPTURAS / "formulario-lleno.png"), full_page=True)

        page.click("button[type=submit]")
        expect(page.locator("#message")).to_have_text("Received!")
        page.screenshot(path=str(CAPTURAS / "formulario-enviado.png"), full_page=True)

        print("Formulario enviado. Capturas en", CAPTURAS)
        navegador.close()


if __name__ == "__main__":
    main()
