import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { createQueryClient } from "@/shared/api";
import { LeadForm } from "./LeadForm";

function renderForm(props) {
  return render(
    <QueryClientProvider client={createQueryClient()}>
      <MemoryRouter>
        <LeadForm variant="modal" title="Ma'lumot qoldirish" onClose={() => {}} {...props} />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("LeadForm", () => {
  it("bo'sh forma yuborilsa — ism va telefon xatolari", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /Yuborish/ }));
    expect(await screen.findByText("Ismingizni kiriting")).toBeInTheDocument();
    expect(screen.getByText("Telefon raqamini to'liq kiriting")).toBeInTheDocument();
    expect(screen.getByLabelText("Ismingiz")).toHaveAttribute("aria-invalid", "true");
  });

  it("telefon niqobi: 901234567 → +998 90 123 45 67", async () => {
    const user = userEvent.setup();
    renderForm();
    const phone = screen.getByLabelText("Telefon raqamingiz");
    await user.type(phone, "901234567");
    expect(phone).toHaveValue("+998 90 123 45 67");
  });

  it("to'g'ri ma'lumot → «Rahmat, Aziz!» va telefon", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("Ismingiz"), "Aziz");
    await user.type(screen.getByLabelText("Telefon raqamingiz"), "901234567");
    await user.click(screen.getByRole("button", { name: /Yuborish/ }));
    expect(await screen.findByRole("heading", { name: "Rahmat, Aziz!" })).toBeInTheDocument();
    expect(screen.getByText("+998 90 123 45 67")).toBeInTheDocument();
  });

  it("429 → «juda ko'p urinish», kiritilgan ma'lumot saqlanadi", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("Ismingiz"), "429");
    await user.type(screen.getByLabelText("Telefon raqamingiz"), "901234567");
    await user.click(screen.getByRole("button", { name: /Yuborish/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Juda ko'p urinish");
    expect(screen.getByLabelText("Ismingiz")).toHaveValue("429");
  });
});
