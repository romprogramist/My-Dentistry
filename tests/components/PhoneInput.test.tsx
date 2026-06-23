import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneInput } from "@/components/forms/PhoneInput";

describe("PhoneInput", () => {
  it("fills the mask template as digits are typed", async () => {
    const user = userEvent.setup();
    let val = "";
    const handle = vi.fn((v: string) => {
      val = v;
    });

    const { rerender } = render(
      <PhoneInput value={val} onChange={handle} id="phone" />
    );

    await user.type(screen.getByRole("textbox"), "9");
    rerender(<PhoneInput value={val} onChange={handle} id="phone" />);
    expect(val).toBe("+7 (9__) ___-__-__");
  });

  it("normalises 8-prefixed pasted number", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<PhoneInput value="" onChange={handle} id="phone" />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.paste("89181234567");

    expect(handle).toHaveBeenLastCalledWith("+7 (918) 123-45-67");
  });

  it("sets tel inputMode and autoComplete", () => {
    render(<PhoneInput value="" onChange={() => {}} id="phone" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("inputMode", "tel");
    expect(input).toHaveAttribute("autoComplete", "tel");
  });
});
