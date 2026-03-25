# Programming Project

Made in React and Python by group 2.

## Team members

* Cillian William Cooke
* Michael Jude Crowley
* Mustafa Alper Ergüne
* Aaron Sean Foley
* Cillian O'Neill Diamond
* Carlos Manuel Cejas

## How to set up

### Backend

1. In the terminal, change directory to backend first with the command `cd backend`
2. Create a virtual environment with:
    `python -m venv venv` or `python3 -m venv venv` if on macOS
3. Activate the virtual environment in this repository with:
    `source venv/bin/activate`
4. Install the required packages with:
    `pip install -r requirements.txt`
5. Run the Python file `main.py` with:
    `python main.py` or `python3 main.py` if on macOS

The backend is now running on http://127.0.0.1:5000/.
To verify that it is running, open the link. You should see the message:
"Flask API is running. Try /day/1"

### Frontend

1. In another terminal window, change directory to frontend with the command:
    `cd frontend`
2. Install dependencies with `npm install`
3. Start Vite dev server with `npm run dev`

The frontend is now running on http://localhost:5173 unless stated otherwise by Vite. Keep both terminal sessions running to use the app.

---

## Math

<!-- Start (x1, y1), Control (cx, cy), End (x2, y2), and t from 0 → 1

Step 1 — Midpoint:
midX = (x1 + x2) / 2
midY = (y1 + y2) / 2

Step 2 — Distance between the two points:
dx = x2 - x1
dy = y2 - y1
distance = sqrt(dx² + dy²)

Step 3 — Perpendicular direction:
The perpendicular to the line between the two points is:
perpX = -dy / distance     (normalized)
perpY =  dx / distance     (normalized)

Step 4 — Control point:
controlX = midX + perpX * (distance * 0.35)
controlY = midY + perpY * (distance * 0.35)

To draw the full curve, iterate t in small steps:
for t from 0 to 1, step 0.01:
    x = (1-t)² * x1  +  2(1-t)t * cx  +  t² * x2
    y = (1-t)² * y1  +  2(1-t)t * cy  +  t² * y2
    plot(x, y)
-->

const dx = airport2X - airport1X;
const dy = airport2Y - airport1Y;
const distance = Math.sqrt(dx * dx + dy * dy);

const midX = (airport1X + airport2X) / 2;
const midY = (airport1Y + airport2Y) / 2;

const perpX = -dy / distance;
const perpY =  dx / distance;

const controlX = midX + perpX * (distance * 0.35);
const controlY = midY + perpY * (distance * 0.35);

for (let t = 0; t <= 1; t += 0.01) {
    const x = Math.pow(1 - t, 2) * airport1X 
             + 2 * (1 - t) * t * controlX 
             + Math.pow(t, 2) * airport2X;

    const y = Math.pow(1 - t, 2) * airport1Y 
             + 2 * (1 - t) * t * controlY 
             + Math.pow(t, 2) * airport2Y;
}