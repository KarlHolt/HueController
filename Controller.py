import os
import requests

def main():
    user = get_user()
    ip = "http://192.168.2.116"
    while True:
        # Wait for user input
        input("Just slowing it down, this should be replaced with a connection to the JS frontend")
        # TO DO: Just thought about that it should also listen on intern port, so I'd need to make the concurrent.



# Function to iniatite the user variable
def get_user(file_name="hidden_user.txt"):
    if os.path.exists(file_name):
        with open(file_name, "r") as file:
            # Assumes that the username is on the first line of the file, doesn't care about the rest of the file content
            user = [line.strip() for line in file][0]
            print("logged in as:", user)
    else:
        print("Couldn't find hidden user file")
        return ""

if __name__ == "__main__":
    main()
