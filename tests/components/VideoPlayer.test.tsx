import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";

describe("VideoPlayer", () => {
  const baseProps = {
    src: "/media/video/microscope",
    poster: "/media/video/microscope.poster.webp",
    title: "Эндодонтия под микроскопом",
  };

  it("renders the poster button initially, no <video> element", () => {
    render(<VideoPlayer {...baseProps} />);
    const button = screen.getByRole("button", {
      name: /воспроизвести.*эндодонтия под микроскопом/i,
    });
    expect(button).toBeInTheDocument();
    const poster = screen.getByAltText("Эндодонтия под микроскопом");
    expect(poster.getAttribute("src")).toContain(encodeURIComponent(baseProps.poster));
    expect(document.querySelector("video")).toBeNull();
  });

  it("mounts a <video> with WebM source first, MP4 second after click", async () => {
    const user = userEvent.setup();
    render(<VideoPlayer {...baseProps} />);
    await user.click(screen.getByRole("button"));

    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("poster", baseProps.poster);

    const sources = video!.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", `${baseProps.src}.webm`);
    expect(sources[0]).toHaveAttribute("type", "video/webm");
    expect(sources[1]).toHaveAttribute("src", `${baseProps.src}.mp4`);
    expect(sources[1]).toHaveAttribute("type", "video/mp4");
  });

  it("respects custom aspectRatio prop", () => {
    render(<VideoPlayer {...baseProps} aspectRatio="4/3" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ aspectRatio: "4/3" });
  });

  it("defaults aspectRatio to 9/16 (vertical)", () => {
    render(<VideoPlayer {...baseProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ aspectRatio: "9/16" });
  });
});
