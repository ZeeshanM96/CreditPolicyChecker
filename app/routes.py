# routes.py 
from app import app
from flask import render_template, request, jsonify

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate_credit():
    data = request.json
    rejection_reasons = []
    credit_policies = app.credit_policies

    # Mapping of input fields to condition types
    input_mapping = {
        "INCOME": ("customer_income", int),
        "DEBT_TO_INCOME_RATIO": ("customer_debt", lambda x: float(x) / float(data.get("customer_income", 0))),
        "PAYMENT_REMARKS_12M": ("payment_remarks_12m", int),
        "PAYMENT_REMARKS": ("payment_remarks", int),
        "AGE": ("customer_age", int),
    }

    for policy in credit_policies['credit_policies']:
        for rule in policy['rules']:
            condition_type = rule['type']
            condition = rule['condition']
            action = rule['action']
            reason = rule['reason']

            user_input_key, conversion_fn = input_mapping.get(condition_type)

            if user_input_key is not None:
                user_input = data.get(user_input_key, 0)
                try:
                    user_input = conversion_fn(user_input)
                except (ValueError, ZeroDivisionError):
                    return jsonify({"result": "ERROR", "reason": "Invalid input data."}), 400

                if not eval(f"user_input {condition}"):
                    continue

                rejection_reasons.append(reason)

    if rejection_reasons:
        return jsonify({"result": "REJECT", "reasons": rejection_reasons})

    return jsonify({"result": "ACCEPT"})


