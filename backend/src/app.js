import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRoutes from './routes/jobRoutes.js';
const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
credentials: true
};

app.get('/api/v1/jobs', (req, res) => {
    const dummyJobs = [
        {
            id: "1",
            title: "Kitchen Renovation",
            shortDescription: "Full renovation of a residential kitchen",
            location: "New York, NY",
            deadline: "2024-12-15",
            priceRange: "$2000 - $3000",
            description: "The job involves demolition, cabinetry installation, plumbing, and electrical work. The client wants a modern, minimalist look.",
            userName: "John Doe",
            userInitials: "JD",
            userId: "user123"
        },
        {
            id: "2",
            title: "Plumbing Fix in Bathroom",
            shortDescription: "Fix a leaky sink and shower in the bathroom",
            location: "San Francisco, CA",
            deadline: "2024-11-10",
            priceRange: "$300 - $500",
            description: "Requires replacement of old pipes and fixing leaks in both the sink and shower. Experienced plumbers preferred.",
            userName: "Jane Smith",
            userInitials: "JS",
            userId: "user456"
        },
        {
            id: "3",
            title: "Home Interior Painting",
            shortDescription: "Paint the interior of a 2-bedroom apartment",
            location: "Chicago, IL",
            deadline: "2024-12-01",
            priceRange: "$1500 - $2500",
            description: "Paint all walls, ceilings, and trims with a high-quality finish. Client prefers eco-friendly, low-VOC paints.",
            userName: "Alice Johnson",
            userInitials: "AJ",
            userId: "user789"
        },
        {
            id: "4",
            title: "Electric Wiring Update",
            shortDescription: "Upgrade old wiring in a single-family home",
            location: "Boston, MA",
            deadline: "2024-11-20",
            priceRange: "$4000 - $6000",
            description: "Replace outdated electrical wiring and ensure compliance with current electrical codes. Experienced electricians only.",
            userName: "Bob Brown",
            userInitials: "BB",
            userId: "user012"
        }
    ];
    res.json({ jobs: dummyJobs });
});

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';
import serviceProviderRouter from './routes/serviceProvider.routes.js';

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/service-providers", serviceProviderRouter);
app.use('/api/v1/users', jobRoutes);
export { app };