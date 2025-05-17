# Octocat Raffle - Prize Wheel

A fun and interactive Prize Wheel application built with Next.js for randomly selecting winners in raffles, contests, or games.

## Features

- Set the number of participants (minimum 2)
- Upload participants from a CSV file
- Interactive spinning wheel with smooth animation
- Automatic winner selection with celebration effect
- Option to remove winners and continue the raffle
- Fully responsive design
- GitHub Octocat themed

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/octo-raffle.git
cd octo-raffle
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  **Set up Participants:**
    *   Manually enter the number of participants using the input field.
    *   Alternatively, click the "Upload CSV" button to select a CSV file from your computer. The CSV file should contain a single column with participant names, one name per row, without a header.
2.  **Spin the Wheel:** Once participants are set up, click the "Spin" button to start the raffle.
3.  **View Winner:** The wheel will spin and land on a winner, who will be announced.
4.  **Continue Raffle (Optional):** You can choose to remove the winner from the list and spin again to select more winners.

## Building for Production

To create a static build for hosting:

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- JavaScript for interactive elements

## License

This project is licensed under the MIT License.
