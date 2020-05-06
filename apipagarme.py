from flask import Flask, jsonify, request, Blueprint
import pagarme
import json
import os

apipagarme = Blueprint('apipagarme', __name__, template_folder='templates')

pagarme.authentication_key(os.getenv('PAGARME_KEY'))


@apipagarme.route("/card/payment", methods=['POST'])
def payment():

    response = {}
    payload = request.get_json()

    if(payload == None):
        status = {"message": "Error Request"}
        return jsonify(status), 400

    card = request.json['card']
    customer = request.json['customer']
    billing = request.json['billing']
    items = request.json['items']

    try:
        card_id = pagarme.card.create(card)['id']
    except Exception:
        response = {"message": "there was an error in the card registration."}
        return jsonify(response), 500

    try:
        pagarme.transaction.create({
            "amount": "1000",
            "card_id": card_id,
            "customer": customer,
            "billing": billing,
            "items": items
        })
    except Exception:
        response = {"message": "a transaction error occurred."}
        return jsonify(response), 500

    response = {"message": "successful transaction."}
    return jsonify(response), 200
