import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeChips } from "@/components/forms/TimeChips";

describe("TimeChips", () => {
  it("emits only the day label when only a day is picked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeChips value="" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    expect(onChange).toHaveBeenLastCalledWith("Завтра");
  });

  it("combines day and period", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Утро" }));

    expect(onChange).toHaveBeenLastCalledWith("Завтра, утро");
  });

  it("clears selection when clicking the active chip", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Завтра" }));

    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("replaces the day within the same group", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Сегодня" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Завтра" }));

    expect(onChange).toHaveBeenLastCalledWith("Завтра");
  });

  it("hydrates aria-pressed state from initial value", () => {
    render(<TimeChips value="Завтра, утро" onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Завтра" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Утро" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Сегодня" })
    ).toHaveAttribute("aria-pressed", "false");
  });
});
