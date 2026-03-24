from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

studentDetails = {
    'nakul': {
        'name': 'Nakul Krishnakumar',
        'rollno': '2023BCS0010',
        'age': 20,
        'college': 'Indian Institute of Information Technology, Kottayam',
        'graduationYear': 2027
    }
}

@app.get("/student-details")
def read_student_details(name: str):
    if name in studentDetails:
        return {
            "studentDetails": studentDetails[name],
        }
    return {
        "error": "Student not found", 
        "message": f"No details found for student '{name}'."
    }

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    pass