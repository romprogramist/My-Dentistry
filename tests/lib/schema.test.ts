import { describe, it, expect } from "vitest";
import {
  buildOrganization,
  buildMedicalClinic,
  buildBreadcrumbList,
  buildPersonDentist,
  buildFAQPage,
} from "@/lib/schema/builders";

describe("buildOrganization", () => {
  it("returns valid Organization JSON-LD", () => {
    const result = buildOrganization();
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Organization");
    expect(result.name).toBe("Моя Стоматология");
    expect(result.url).toBe("https://mydentsochi.ru");
  });
});

describe("buildMedicalClinic", () => {
  it("includes address, geo, hours, telephones", () => {
    const result = buildMedicalClinic();
    expect(result["@type"]).toBe("Dentist");
    expect(result.address.postalCode).toBe("354068");
    expect(result.geo.latitude).toBe(43.6178);
    expect(result.telephone).toContain("+79891687113");
    expect(result.openingHoursSpecification[0]?.opens).toBe("09:00");
  });

  it("includes aggregateRating from 2GIS", () => {
    const result = buildMedicalClinic();
    expect(result.aggregateRating).toBeDefined();
    expect(result.aggregateRating?.reviewCount).toBe(104);
    expect(result.aggregateRating?.ratingValue).toBe(4.9);
  });
});

describe("buildBreadcrumbList", () => {
  it("builds correct positions and URLs", () => {
    const crumbs = buildBreadcrumbList([
      { name: "Главная", url: "https://mydentsochi.ru/" },
      { name: "Услуги", url: "https://mydentsochi.ru/uslugi/" },
      {
        name: "Циркониевые коронки",
        url: "https://mydentsochi.ru/uslugi/protezirovanie/koronki-cirkoniy/",
      },
    ]);
    expect(crumbs.itemListElement).toHaveLength(3);
    expect(crumbs.itemListElement[0]?.position).toBe(1);
    expect(crumbs.itemListElement[2]?.name).toBe("Циркониевые коронки");
  });
});

describe("buildPersonDentist", () => {
  it("creates Person with worksFor linkage", () => {
    const result = buildPersonDentist({
      name: "Хечоян Армен Араратович",
      jobTitle: "Врач-ортопед",
      image: "/images/doctors/khechoyan.jpg",
    });
    expect(result["@type"]).toBe("Person");
    expect(result.jobTitle).toBe("Врач-ортопед");
    expect(result.worksFor?.name).toBe("Моя Стоматология");
  });
});

describe("buildFAQPage", () => {
  it("builds Question/Answer entities", () => {
    const result = buildFAQPage([
      { question: "Сколько служит коронка?", answer: "От 10 до 15 лет." },
    ]);
    expect(result.mainEntity).toHaveLength(1);
    expect(result.mainEntity[0]?.["@type"]).toBe("Question");
    expect(result.mainEntity[0]?.acceptedAnswer.text).toBe("От 10 до 15 лет.");
  });
});
