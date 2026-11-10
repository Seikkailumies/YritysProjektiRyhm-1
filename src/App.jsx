import { useEffect, useMemo, useState } from "react";
import "./App.css";

const products = {
  oats: { name: "Kaurahiutaleet", pack: 1000, price: 1.49 },
  barley: { name: "Ohrahiutaleet", pack: 500, price: 1.69 },
  rice: { name: "Puuroriisi", pack: 1000, price: 2.29 },
  potatoFlour: { name: "Perunasuurimo", pack: 500, price: 2.49 },
  milk: { name: "Maito", pack: 1000, price: 1.19 },
  salt: { name: "Suola", pack: 1000, price: 0.69 },
  potato: { name: "Peruna", pack: 2000, price: 2.49 },
  banana: { name: "Banaani", pack: 1000, price: 1.79 },
  mango: { name: "Pakastemango", pack: 500, price: 3.49 },
  yogurt: { name: "Maustamaton jogurtti", pack: 1000, price: 1.99 },
  pineappleJuice: { name: "Ananasmehu", pack: 1000, price: 1.79 },
  honey: { name: "Hunaja", pack: 450, price: 3.49 },
  berries: { name: "Pakastemarjat", pack: 500, price: 3.49 },
  sunflower: { name: "Auringonkukansiemenet", pack: 200, price: 1.49 },
  oatBran: { name: "Kauralese", pack: 500, price: 1.79 },
  sugar: { name: "Sokeri", pack: 1000, price: 1.29 },
  macaroni: { name: "Makaroni", pack: 500, price: 0.49 },
  harkis: { name: "Härkäpapuvalmiste", pack: 250, price: 3.49 },
  egg: { name: "Kananmunat", pack: 500, price: 2.49 },
  onion: { name: "Sipuli", pack: 1000, price: 1.49 },
  cheese: { name: "Edamjuusto", pack: 500, price: 3.99 },
  salmon: { name: "Lohifilee", pack: 300, price: 6.99 },
  beef: { name: "Naudan keittoliha", pack: 400, price: 5.99 },
  soupVeg: { name: "Keittojuurekset, pakaste", pack: 500, price: 1.69 },
  sausage: { name: "Nakki", pack: 300, price: 1.79 },
  lightSausage: { name: "Kevytnakki", pack: 300, price: 1.79 },
  flour: { name: "Vehnäjauho", pack: 2000, price: 1.49 },
  butter: { name: "Voi", pack: 500, price: 3.49 },
  oil: { name: "Ruoanvalmistusöljy", pack: 1000, price: 2.99 },
  spinach: { name: "Pakastepinaatti", pack: 450, price: 1.99 },
  peas: { name: "Kuivatut herneet", pack: 500, price: 1.69 },
  cannedPeaSoup: { name: "Hernekeitto, säilyke", pack: 500, price: 1.49 },
  carrot: { name: "Porkkana", pack: 1000, price: 1.49 },
  cabbage: { name: "Valkokaali", pack: 1000, price: 1.99 },
  mince: { name: "Sika-nautajauheliha", pack: 400, price: 4.49 },
  soySauce: { name: "Soijakastike", pack: 150, price: 1.49 },
};

const meals = [
  { id: "oatmeal", name: "Kaurapuuro", kcal: 228, ingredients: { oats: 40, milk: 150, salt: 1 } },
  { id: "barley", name: "Ohrapuuro", kcal: 105, ingredients: { barley: 40, salt: 1 } },
  { id: "rice-porridge", name: "Uuniriisipuuro", kcal: 282, ingredients: { rice: 35, milk: 250, salt: 1, butter: 4 } },
  { id: "potato-velli", name: "Perunavelli", kcal: 219, ingredients: { potatoFlour: 35, milk: 220, butter: 5, salt: 1 } },
  { id: "karelian-pie", name: "Karjalanpiirakka", kcal: 522, ingredients: { rice: 20, milk: 70, flour: 15, butter: 5 } },
  { id: "mango-smoothie", name: "Mangosmoothie", kcal: 225, ingredients: { mango: 80, banana: 50, yogurt: 100, pineappleJuice: 50, honey: 5 } },
  { id: "berry-smoothie", name: "Marjasmoothie", kcal: 315, ingredients: { yogurt: 150, berries: 60, sunflower: 10, oatBran: 10, sugar: 5 } },
  { id: "harkis-macaroni", name: "Härkis-makaronilaatikko", kcal: 378, ingredients: { macaroni: 55, harkis: 70, milk: 100, egg: 30, onion: 15, cheese: 15 } },
  { id: "salmon-macaroni", name: "Lohi-makaronilaatikko", kcal: 384, ingredients: { macaroni: 55, salmon: 60, milk: 100, egg: 30, onion: 15, cheese: 15 } },
  { id: "beef-soup", name: "Lihakeitto", kcal: 135, ingredients: { beef: 50, potato: 100, soupVeg: 100, onion: 15, salt: 1 } },
  { id: "sausage-soup", name: "Nakkikeitto", kcal: 189, ingredients: { sausage: 45, potato: 120, soupVeg: 100, onion: 15, salt: 1 } },
  { id: "light-sausage-soup", name: "Kevytnakkikeitto", kcal: 147, ingredients: { lightSausage: 45, potato: 120, soupVeg: 100, onion: 15, salt: 1 } },
  { id: "salmon-soup", name: "Lohikeitto", kcal: 270, ingredients: { salmon: 50, potato: 120, milk: 80, onion: 15, flour: 5, butter: 5, salt: 1 } },
  { id: "pea-soup-beef", name: "Hernekeitto naudanlihalla", kcal: 246, ingredients: { peas: 60, beef: 30, onion: 15, salt: 1 } },
  { id: "canned-pea-soup", name: "Hernekeitto säilykkeestä", kcal: 243, ingredients: { cannedPeaSoup: 300 } },
  { id: "spinach-soup", name: "Pinaattikeitto", kcal: 174, ingredients: { spinach: 80, milk: 150, flour: 10, butter: 5, salt: 1 } },
  { id: "omelet", name: "Talonpoikaismunakas", kcal: 474, ingredients: { egg: 100, potato: 100, sausage: 50, onion: 25, oil: 5, salt: 1 } },
  { id: "tamago", name: "Japanilainen munakas", kcal: 579, ingredients: { egg: 150, sugar: 5, soySauce: 10, oil: 5 } },
  { id: "beef-cabbage", name: "Kaalilaatikko naudanlihalla", kcal: 264, ingredients: { cabbage: 120, carrot: 30, mince: 70, onion: 25, oil: 5, salt: 1 } },
  { id: "mixed-cabbage", name: "Kaalilaatikko sika-naudalla", kcal: 321, ingredients: { cabbage: 120, carrot: 30, mince: 70, onion: 25, oil: 5, salt: 1 } },
];

const breakfastIds = new Set([
  "oatmeal",
  "barley",
  "rice-porridge",
  "potato-velli",
  "mango-smoothie",
  "berry-smoothie",
]);

const mealTypes = [
  { id: "breakfast", label: "Aamiainen", icon: "☀️" },
  { id: "lunch", label: "Lounas", icon: "🥗" },
  { id: "dinner", label: "Päivällinen", icon: "🍲" },
];

const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const STORAGE_KEY = "arki-app-v3";

function normalizePlan(rawPlan) {
  if (!rawPlan || typeof rawPlan !== "object") return {};

  return Object.fromEntries(
    Object.entries(rawPlan).map(([dateKey, value]) => {
      if (typeof value === "string") {
        return [dateKey, { breakfast: "", lunch: value, dinner: "" }];
      }

      return [
        dateKey,
        {
          breakfast: value?.breakfast ?? "",
          lunch: value?.lunch ?? "",
          dinner: value?.dinner ?? "",
        },
      ];
    }),
  );
}

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    return {
      budget: saved.budget ?? 100,
      prices: saved.prices ?? {},
      plan: normalizePlan(saved.plan),
    };
  } catch {
    return { budget: 100, prices: {}, plan: {} };
  }
}

function mondayOf(date) {
  const result = new Date(date);
  result.setHours(12, 0, 0, 0);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
}

function dayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function euro(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function mealsForType(type) {
  return type === "breakfast"
    ? meals.filter((meal) => breakfastIds.has(meal.id))
    : meals.filter((meal) => !breakfastIds.has(meal.id));
}

function flattenMealIds(plan) {
  return Object.values(plan).flatMap((day) => {
    if (typeof day === "string") return [day];
    return mealTypes.map((type) => day?.[type.id]).filter(Boolean);
  });
}

function basketFor(plan, prices) {
  const quantities = {};

  flattenMealIds(plan).forEach((mealId) => {
    const meal = meals.find((item) => item.id === mealId);
    if (!meal) return;

    Object.entries(meal.ingredients).forEach(([productId, amount]) => {
      quantities[productId] = (quantities[productId] ?? 0) + amount;
    });
  });

  const items = Object.entries(quantities).map(([productId, amount]) => {
    const product = products[productId];
    const packs = Math.ceil(amount / product.pack);
    const price = prices[productId] ?? product.price;

    return {
      productId,
      name: product.name,
      amount,
      pack: product.pack,
      packs,
      price,
      total: packs * price,
    };
  });

  return {
    items,
    total: items.reduce((sum, item) => sum + item.total, 0),
  };
}

export default function App() {
  const [saved] = useState(readSaved);
  const [budget, setBudget] = useState(saved.budget);
  const [prices, setPrices] = useState(saved.prices);
  const [plan, setPlan] = useState(saved.plan);
  const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()));
  const [suggestionMessage, setSuggestionMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, prices, plan }));
  }, [budget, prices, plan]);

  const days = useMemo(
    () =>
      weekdays.map((label, index) => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + index);
        return { label, date, key: dayKey(date) };
      }),
    [weekStart],
  );

  const weekPlan = useMemo(
    () =>
      Object.fromEntries(
        days
          .filter((day) => plan[day.key])
          .map((day) => [day.key, plan[day.key]]),
      ),
    [days, plan],
  );

  const basket = useMemo(() => basketFor(weekPlan, prices), [weekPlan, prices]);
  const plannedMealIds = flattenMealIds(weekPlan);
  const plannedMeals = plannedMealIds
    .map((id) => meals.find((meal) => meal.id === id))
    .filter(Boolean);
  const totalKcal = plannedMeals.reduce((sum, meal) => sum + meal.kcal, 0);

  function changeWeek(offset) {
    setWeekStart((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + offset * 7);
      return next;
    });
    setSuggestionMessage("");
  }

  function changeMeal(dateKey, type, mealId) {
    setPlan((current) => ({
      ...current,
      [dateKey]: {
        breakfast: current[dateKey]?.breakfast ?? "",
        lunch: current[dateKey]?.lunch ?? "",
        dinner: current[dateKey]?.dinner ?? "",
        [type]: mealId,
      },
    }));
    setSuggestionMessage("");
  }

  function suggestWeek() {
    const slots = days.flatMap((day) =>
      mealTypes.map((type) => ({ dateKey: day.key, type: type.id })),
    );

    let bestPlan = null;
    let bestCount = -1;
    const budgetLimit = Number(budget);

    for (let attempt = 0; attempt < 100; attempt += 1) {
      const candidatePlan = Object.fromEntries(
        days.map((day) => [
          day.key,
          { breakfast: "", lunch: "", dinner: "" },
        ]),
      );

      for (const slot of shuffle(slots)) {
        const usedThatDay = Object.values(candidatePlan[slot.dateKey]).filter(Boolean);
        const possibleMeals = shuffle(
          mealsForType(slot.type).filter((meal) => !usedThatDay.includes(meal.id)),
        );

        const affordableMeals = possibleMeals.filter((meal) => {
          const testPlan = {
            ...candidatePlan,
            [slot.dateKey]: {
              ...candidatePlan[slot.dateKey],
              [slot.type]: meal.id,
            },
          };
          return basketFor(testPlan, prices).total <= budgetLimit;
        });

        if (affordableMeals.length > 0) {
          const chosen = affordableMeals[Math.floor(Math.random() * affordableMeals.length)];
          candidatePlan[slot.dateKey][slot.type] = chosen.id;
        }
      }

      const filledCount = flattenMealIds(candidatePlan).length;

      if (filledCount > bestCount || (filledCount === bestCount && Math.random() < 0.15)) {
        bestPlan = candidatePlan;
        bestCount = filledCount;
      }

      if (filledCount === slots.length) break;
    }

    setPlan((current) => {
      const otherWeeks = { ...current };
      days.forEach((day) => delete otherWeeks[day.key]);
      return { ...otherWeeks, ...bestPlan };
    });

    if (bestCount === slots.length) {
      setSuggestionMessage("Kaikki 21 ateriaa arvottiin viikkobudjetin rajoissa.");
    } else {
      setSuggestionMessage(
        `Budjetti riitti ${bestCount} / 21 ateriaan. Nosta budjettia, jos haluat täyttää kaikki ateriat.`,
      );
    }
  }

  function removeMeal(dateKey, type) {
    changeMeal(dateKey, type, "");
  }

  function updatePrice(productId, value) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      setPrices((current) => ({ ...current, [productId]: parsed }));
    }
  }

  return (
    <main className="app">
      <header className="top">
        <div>
          <p className="eyebrow">ARKI · VIIKKOSUUNNITTELU</p>
          <h1>Ruokaa budjetilla</h1>
          <p className="muted">
            Arvo viikon ateriat ja seuraa ostoskorin arvioitua hintaa.
          </p>
        </div>

        <div className="budget-box">
          <label htmlFor="budget">Viikkobudjetti</label>
          <div className="budget-input">
            <input
              id="budget"
              type="number"
              min="0"
              step="1"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
            />
            <strong>€</strong>
          </div>
        </div>
      </header>

      <section className="summary">
        <div className="summary-card">
          <span>Ostoskorin arvio</span>
          <strong>{euro(basket.total)}</strong>
        </div>
        <div className="summary-card">
          <span>Budjettia jäljellä</span>
          <strong className={basket.total > budget ? "over" : ""}>
            {euro(Number(budget) - basket.total)}
          </strong>
        </div>
        <div className="summary-card">
          <span>Suunniteltuja aterioita</span>
          <strong>{plannedMeals.length} / 21</strong>
        </div>
        <div className="summary-card">
          <span>Kalorit yhteensä</span>
          <strong>{totalKcal.toLocaleString("fi-FI")} kcal</strong>
        </div>
      </section>

      <section className="planner-heading">
        <div>
          <h2>Viikon ateriat</h2>
          <p className="muted">Jokainen ateria on yksi 300 g annos.</p>
        </div>

        <div className="actions">
          <button className="secondary" onClick={() => changeWeek(-1)}>
            ← Edellinen
          </button>
          <button
            className="secondary"
            onClick={() => {
              setWeekStart(mondayOf(new Date()));
              setSuggestionMessage("");
            }}
          >
            Tämä viikko
          </button>
          <button className="secondary" onClick={() => changeWeek(1)}>
            Seuraava →
          </button>
          <button className="primary" onClick={suggestWeek}>
            Arvo viikon ateriat
          </button>
        </div>
      </section>

      {suggestionMessage && (
        <p className="suggestion-message" role="status">
          {suggestionMessage}
        </p>
      )}

      <section className="calendar">
        {days.map((day) => {
          const dayPlan = plan[day.key] ?? {};

          return (
            <article className="day" key={day.key}>
              <div className="day-title">
                <strong>{day.label}</strong>
                <span>
                  {day.date.toLocaleDateString("fi-FI", {
                    day: "numeric",
                    month: "numeric",
                  })}
                </span>
              </div>

              <div className="meal-slots">
                {mealTypes.map((type) => {
                  const selected = meals.find(
                    (meal) => meal.id === dayPlan[type.id],
                  );

                  return (
                    <div className="meal-slot" key={type.id}>
                      <label className="slot-label" htmlFor={`${day.key}-${type.id}`}>
                        <span aria-hidden="true">{type.icon}</span>
                        {type.label}
                      </label>

                      {selected ? (
                        <div className="selected-meal">
                          <strong>{selected.name}</strong>
                          <span>{selected.kcal} kcal · 300 g</span>
                          <button
                            className="text-button"
                            onClick={() => removeMeal(day.key, type.id)}
                          >
                            Poista
                          </button>
                        </div>
                      ) : (
                        <p className="empty">Ei valittua ateriaa</p>
                      )}

                      <select
                        id={`${day.key}-${type.id}`}
                        aria-label={`${type.label}, ${day.label}`}
                        value={dayPlan[type.id] ?? ""}
                        onChange={(event) =>
                          changeMeal(day.key, type.id, event.target.value)
                        }
                      >
                        <option value="">Valitse ruoka</option>
                        {mealsForType(type.id).map((meal) => (
                          <option key={meal.id} value={meal.id}>
                            {meal.name} · {meal.kcal} kcal
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      <section className="shopping">
        <div className="shopping-heading">
          <div>
            <h2>Ostoslista</h2>
            <p className="muted">
              Määrät lasketaan viikon aterioista ja pakkaukset pyöristetään
              kokonaisiin pakkauksiin.
            </p>
          </div>
          <strong className="basket-total">{euro(basket.total)}</strong>
        </div>

        {basket.items.length === 0 ? (
          <p className="empty">Valitse tai arvo aterioita, niin ostoslista muodostuu.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tuote</th>
                  <th>Tarve</th>
                  <th>Pakkaus</th>
                  <th>Pakkauksia</th>
                  <th>Arviohinta / pakkaus</th>
                  <th>Yhteensä</th>
                </tr>
              </thead>
              <tbody>
                {basket.items.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.name}</td>
                    <td>{item.amount} g</td>
                    <td>{item.pack} g</td>
                    <td>{item.packs} kpl</td>
                    <td>
                      <label className="price-input">
                        <input
                          aria-label={`${item.name}: arviohinta pakkaukselle`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={(
                            prices[item.productId] ??
                            products[item.productId].price
                          ).toFixed(2)}
                          onChange={(event) =>
                            updatePrice(item.productId, event.target.value)
                          }
                        />
                        €
                      </label>
                    </td>
                    <td>{euro(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="disclaimer">
        Hinnat ja ainesosamäärät ovat muokattavia demoarvioita, eivät vahvistettuja
        kauppahintoja tai tarkkoja reseptejä. Kalorimäärät ovat aiemmasta
        Fineli-listasta kerrottuina 300 grammalle. Todelliset hinnat ja
        annoskoostumukset voivat poiketa.
      </p>
    </main>
  );
}