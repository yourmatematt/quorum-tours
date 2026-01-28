# Plain Text Email Versions

All HTML emails must have plain text fallbacks for email clients that don't support HTML. Use these as your text/plain MIME part.

---

## Email #1: 1 Month Inactive (Plain Text)

```
QUORUM TOURS: Welcome Back

Subject: {{user.first_name}}, {{tours.new_count}} new birding tours just arrived

---

Hi {{user.first_name}},

We noticed you haven't logged into Quorum Tours since {{user.signup_date}}. No judgment—we know life gets busy. But a lot has happened since you signed up.

HERE'S WHAT'S NEW:

Since you joined, we've added {{tours.new_count}} tours across your region. {{tours.region_count}} of them are in {{user.region}}—the exact area you'd want to explore.

Some highlights:

✓ Search by species. You can now filter tours by the exact birds you're chasing. If you're looking for a Scarlet Tanager, Prothonotary Warbler, or any other target, you can find tours specifically designed around them.

✓ Real sightings. Every tour comes with a review showing exactly what was spotted. You can see participant reviews and photos—real data from real tours.

✓ Your region's schedule. {{tours.region_count}} tours are planned for {{user.region}} over the next few months. That's {{tours.region_count}} opportunities to get out there.

WHAT CAN YOU DO RIGHT NOW?

Log back in and browse tours in your area. When you commit to a tour, that's when the commitment system kicks in—but you can explore, filter, and plan without any pressure.

[LOG IN AND EXPLORE TOURS]
https://quorumtours.com/tours

Questions about how the platform works? Check out our How It Works page:
https://quorumtours.com/how-it-works

Happy birding,
The Quorum Tours Team

---

P.S. — You can check the tours running in {{user.region}} without logging in. Browse first, commit when you find something you love.

UNSUBSCRIBE: {{unsubscribe_link}}
```

---

## Email #2: 3 Months Inactive (Plain Text)

```
QUORUM TOURS: {{user.region}} - What Happened

Subject: {{tours.region_count}} {{user.region}} tours. {{sightings.region_examples[0].bird_name}} spotted.

---

Hi {{user.first_name}},

Three months ago, you signed up for Quorum Tours. Since then, {{tours.region_count}} tours have run successfully in {{user.region}}. And they all produced real sightings from real birders.

WHAT RAN WHILE YOU WERE AWAY:

BIRD: {{sightings.region_examples[0].bird_name}}
Tour: {{sightings.region_examples[0].tour_title}}
Date: {{sightings.region_examples[0].tour_date}}
Participants: {{sightings.region_examples[0].participants}} birders saw it

BIRD: {{sightings.region_examples[1].bird_name}}
Location: {{user.region}}
Date: {{sightings.region_examples[1].tour_date}}
Participants: {{sightings.region_examples[1].participants}} people documented it
Status: Real photos, real notes, all live on our platform

These aren't theoretical tours. These are real trips that ran with real birders who found real birds—in the area you're interested in.

HOW THE QUORUM SYSTEM WORKS (A REMINDER):

Quorum Tours is different from typical booking platforms. Tours only confirm when enough birders commit. This solves a real problem: small groups (4-5 people) rarely happen on traditional platforms, but they're actually when good birding happens. You see more, discuss more, move more deliberately.

When you commit to a tour, you're joining a group that WILL go. No tour leaves if it doesn't have enough people. That's the quorum: the minimum number of participants needed to make a tour viable.

WHY THIS MATTERS FOR {{user.region}}:

{{user.region}} is a prime birding zone right now, and tours are filling up. {{tours.region_count}} have run successfully since you joined. More are scheduled for the coming months.

If you're serious about adding {{user.region}} birds to your list, now's the time to get back in.

[BROWSE TOURS IN {{user.region}}]
https://quorumtours.com/tours?region={{user.region}}

Have questions about how commitments work? Read our How It Works guide:
https://quorumtours.com/how-it-works

Happy birding,
The Quorum Tours Team

---

P.S. — If you're waiting for a specific tour in {{user.region}}, reach out. We can help you find (or request) exactly what you're looking for.

UNSUBSCRIBE: {{unsubscribe_link}}
```

---

## Email #3: 6 Months Inactive (Plain Text)

```
QUORUM TOURS: You Missed {{sightings.lifers_count}} Lifers

Subject: You missed {{sightings.lifers_count}} potential lifers in {{user.region}}. Here's proof.

---

Hi {{user.first_name}},

Six months. That's how long it's been since you signed up for Quorum Tours.

In that time, {{tours.missed_count}} tours ran successfully across the platform. {{tours.region_count}} of them were in {{user.region}}—your region. And they all found birds.

HERE'S WHAT ACTUALLY GOT SPOTTED:

BIRD: {{sightings.region_examples[0].bird_name}}
Tour: {{sightings.region_examples[0].tour_title}}
Date: {{sightings.region_examples[0].tour_date}}
Participants: {{sightings.region_examples[0].participants}} birders were there. You weren't.

Sighting Report: https://quorumtours.com/tours/[tour-id]/reviews

BIRD: {{sightings.region_examples[1].bird_name}}
Location: {{user.region}}
Date: {{sightings.region_examples[1].tour_date}}
Participants: {{sightings.region_examples[1].participants}} participants
Documentation: Real photos. Real notes. All documented.

If you had been on either of these tours—if you had a spot and had committed—you would have seen these birds firsthand.

YOUR CHASE LIST COULD HAVE GROWN.

We don't know your specific target species, but if you had a chase list when you signed up, birds from it were almost certainly spotted on tours you could have joined.

This isn't about the tours that might happen. This is about the tours that DID happen. The sightings are real. The photos are there. The participants' notes are live on the platform.

And you weren't there.

WHAT HAPPENS NEXT IS UP TO YOU.

You can log back in right now. Browse tours in {{user.region}}. Read what people saw. Check upcoming trips. The quorum system means you're never paying for a tour that won't happen—only tours with confirmed participant numbers go forward.

Or you can keep checking your email in another six months, wondering what you missed this time.

[LOG IN AND SEE WHAT YOU MISSED]
https://quorumtours.com/login

Questions? How It Works explains everything:
https://quorumtours.com/how-it-works

Happy birding,
The Quorum Tours Team

---

P.S. — If you're still interested but uncertain about the platform, reach out. We're happy to explain how the quorum system works and why it actually means better birding trips for everyone.

UNSUBSCRIBE: {{unsubscribe_link}}
```

---

## Email #4: 12 Months Inactive (Plain Text)

```
QUORUM TOURS: One Year Later

Subject: 12 lifers. 47 tours. 0 with you.

---

Hi {{user.first_name}},

Exactly one year ago today, you signed up for Quorum Tours.

You never came back.

HERE'S WHAT HAPPENED IN THE YEAR YOU WERE GONE:

{{stats.year_in_review.total_tours}} tours ran across the platform.
{{stats.year_in_review.total_sightings}} birds were spotted by participants.
{{stats.year_in_review.new_lifers}} of them were lifers.

In {{user.region}}?
{{tours.region_count}} tours.
{{sightings.lifers_count}} potential lifers spotted.

NOT A SINGLE ONE WITH YOU.

THE SPECIFIC BIRDS YOU COULD HAVE SEEN:

BIRD: {{sightings.region_examples[0].bird_name}}
Date Spotted: {{sightings.region_examples[0].tour_date}}
Tour: {{sightings.region_examples[0].tour_title}}
Participants: {{sightings.region_examples[0].participants}} people saw it in person
Status: Reviewed and documented on our platform. You weren't there.

BIRD: {{sightings.region_examples[1].bird_name}}
Date: {{sightings.region_examples[1].tour_date}}
Location: {{user.region}}
Participants: {{sightings.region_examples[1].participants}} participants
Reality: Real sightings. Real photos. Real memories you don't have.

THE BIGGER PICTURE:

If you had a chase list when you signed up:
{{chase_list.spotted}} species from it were spotted on tours between now and then.

That's {{chase_list.spotted}} ticks you don't have.

{{chase_list.spotted}} reasons you might be frustrated with yourself right now.

WHY AM I SENDING THIS?

Because a year is a long time. Because you clearly had interest in birding when you signed up. And because the platform is genuinely better than when you joined—more tours, better reviews, real data on what gets spotted where.

And because you're missing out on real experiences with real birders in real places.

ONE MORE OPTION:

Log in. Browse what's coming next. See a tour that speaks to you. Commit. That's it. The quorum system means the tour only charges you when it reaches minimum participants. You're never stuck paying for something that might not happen.

You've been away a year. The platform is ready whenever you are.

[LOG IN AND GET BACK IN THE FIELD]
https://quorumtours.com/login

Or if you'd rather not come back—that's okay too. Hit reply and let us know. We'll remove you from future emails.

Happy birding (or at least, the chance to go),
The Quorum Tours Team

---

P.S. — No hard feelings. We know life happens. But you signed up for a reason. That reason probably hasn't changed. Log back in.

UNSUBSCRIBE: {{unsubscribe_link}}
```

---

## Implementation Notes for Text Versions

1. **MIME Structure:** Each email must have both HTML and plain text parts
   - Content-Type: multipart/alternative
   - First part: text/plain (this content)
   - Second part: text/html (from HTML files)

2. **Line Length:** Keep text lines to 80 characters for optimal readability on all clients

3. **Special Characters:** Use plain text equivalents:
   - Checkmarks: ✓ or [✓]
   - Arrows: → or >
   - Bullets: • or -

4. **Links:** On their own line for clarity

5. **Sections:** Use ALL CAPS for headers in plain text for visual hierarchy

