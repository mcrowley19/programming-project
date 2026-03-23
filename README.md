# programming-project

Made in react and python

## Team members

* Cillian William Cooke
* Michael Jude Crowley
* Mustafa Alper Ergüne
* Aaron Sean Foley
* Cillian O'Neill Diamond
* Carlos Manuel Cejas


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
controlY = midY + perpY * (distance * 0.35) -->

midPointX = (airport1X + airport2X) / 2;
midPointY = (airport1Y + airport2Y) / 2;

distanceX = Math.abs(airport2X - airport1X);
distanceY = Math.abs(airport2Y - airport1Y);
distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

perpX = - distanceY / distance;
perpY =  distanceX / distance;

controlX = midPointX + (perpX * distance * 0.35);
controlY = midPointY + (perpX * distance * 0.35);

<!-- 
Step 1 — Lerp from start to control:
ax = x1 + t * (cx - x1)
ay = y1 + t * (cy - y1)

Step 2 — Lerp from control to end:
bx = cx + t * (x2 - cx)
by = cy + t * (y2 - cy)

Step 3 — Lerp between those two results:
pointX = ax + t * (bx - ax)
pointY = ay + t * (by - ay)

Expanded into the single formula:
pointX = (1-t)² * x1  +  2(1-t)t * cx  +  t² * x2
pointY = (1-t)² * y1  +  2(1-t)t * cy  +  t² * y2

To draw the full curve, iterate t in small steps:
for t from 0 to 1, step 0.01:
    x = (1-t)² * x1  +  2(1-t)t * cx  +  t² * x2
    y = (1-t)² * y1  +  2(1-t)t * cy  +  t² * y2
    plot(x, y)
-->

for(int t = 20; t >= 0; t--){
    pointX = Math.pow(1-t,2) * airport1X + 2(1)
}