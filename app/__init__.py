# __init__.py
from flask import Flask
import json

app = Flask(__name__)

def load_credit_policies():
    with open('policy/policy.json', 'r') as json_file:
        app.credit_policies = json.load(json_file)

load_credit_policies()
from app import routes
