import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/forms/submit-booking", () => ({
  submitBooking: vi.fn(),
}));

import { submitBooking } from "@/lib/forms/submit-booking";
import { BookingForm } from "@/components/forms/BookingForm";

const mockSubmit = submitBooking as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockSubmit.mockReset();
});

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/имя/i), "Иван Иванов");
  await user.type(screen.getByLabelText(/телефон/i), "9181234567");
  await user.click(screen.getByRole("checkbox"));
}

describe("BookingForm", () => {
  it("submits valid data and shows success screen", async () => {
    mockSubmit.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    expect(mockSubmit.mock.calls[0]![0]).toMatchObject({
      name: "Иван Иванов",
      phone: "+79181234567",
      consent: true,
    });
    expect(await screen.findByText(/спасибо!/i)).toBeInTheDocument();
  });

  it("blocks submission when phone is incomplete", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.type(screen.getByLabelText(/имя/i), "Иван");
    await user.type(screen.getByLabelText(/телефон/i), "918");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/корректный российский номер/i)
    ).toBeInTheDocument();
  });

  it("blocks submission without consent", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.type(screen.getByLabelText(/имя/i), "Иван Иванов");
    await user.type(screen.getByLabelText(/телефон/i), "9181234567");
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/согласие/i)).toBeInTheDocument();
  });

  it("shows error banner with tel link on server failure", async () => {
    mockSubmit.mockResolvedValue({ ok: false, error: "Network down" });
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(
      await screen.findByText(/не удалось отправить/i)
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /\+7/ });
    expect(link.getAttribute("href")).toMatch(/^tel:/);
  });

  it("renders service pill when servicePreselected is given", () => {
    render(<BookingForm servicePreselected="lechenie-kariesa" />);
    expect(screen.getByText(/услуга:/i)).toBeInTheDocument();
    expect(screen.getByText("Кариес")).toBeInTheDocument();
  });

  it("clears service pill via close button", async () => {
    const user = userEvent.setup();
    render(<BookingForm servicePreselected="lechenie-kariesa" />);

    await user.click(screen.getByRole("button", { name: /убрать услугу/i }));
    expect(screen.queryByText(/услуга:/i)).not.toBeInTheDocument();
  });
});
