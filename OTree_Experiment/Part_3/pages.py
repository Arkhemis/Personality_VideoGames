from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
import os
import subprocess
import sys
import random




ok = 1

class rprr(Page):
    form_model = 'player'
    form_fields = ['Time_Justify', 'Autre_Justify']
    def is_displayed(self):
        global code
        code = self.participant.code
        return ok == 1

    def before_next_page(self):
        self.player.Envie_WordsList_Souls = self.participant.vars['Envie_WordsList_Souls']
        self.player.Envie_WordsList_Shooter = self.participant.vars['Envie_WordsList_Shooter']
        self.player.Envie_WordsList_Horror = self.participant.vars['Envie_WordsList_Horror']
        self.player.Envie_WordsList_RTS = self.participant.vars['Envie_WordsList_RTS']
        self.player.Envie_WordsList_RPG = self.participant.vars['Envie_WordsList_RPG']
        self.player.Envie_WordsList_Survival = self.participant.vars['Envie_WordsList_Survival']
        self.player.Envie_WordsList_Multiplayer = self.participant.vars['Envie_WordsList_Multiplayer']
        self.player.Personality = self.participant.vars['Personality']
    def vars_for_template(player):
        WordsList_Souls = Constants.WordsList_Souls.copy()
        #random.Random(str(code)).shuffle(WordsList_Souls)
        WordsList_Shooter = Constants.WordsList_Shooter.copy()
        #random.Random(str(code)).shuffle(WordsList_Shooter)
        WordsList_Horror = Constants.WordsList_Horror.copy()
        #random.Random(str(code)).shuffle(WordsList_Horror)
        WordsList_RTS = Constants.WordsList_RTS.copy()
        #random.Random(str(code)).shuffle(WordsList_RTS)
        WordsList_RPG = Constants.WordsList_RPG.copy()
        #random.Random(str(code)).shuffle(WordsList_RPG)
        WordsList_Survival = Constants.WordsList_Survival.copy()
        #random.Random(str(code)).shuffle(WordsList_Survival)
        WordsList_Multiplayer = Constants.WordsList_Multiplayer.copy()
        #random.Random(str(code)).shuffle(WordsList_Multiplayer)
        WordsList_Souls_FR = Constants.WordsList_Souls_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_Souls_FR)
        WordsList_Shooter_FR = Constants.WordsList_Shooter_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_Shooter_FR)
        WordsList_Horror_FR = Constants.WordsList_Horror_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_Horror_FR)
        WordsList_RTS_FR = Constants.WordsList_RTS_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_RTS_FR)
        WordsList_RPG_FR = Constants.WordsList_RPG_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_RPG_FR)
        WordsList_Survival_FR = Constants.WordsList_Survival_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_Survival_FR)
        WordsList_Multiplayer_FR = Constants.WordsList_Multiplayer_FR.copy()
        #random.Random(str(code)).shuffle(WordsList_Multiplayer_FR)
        return dict(
            WordsList_Souls=WordsList_Souls,
            WordsList_Shooter=WordsList_Shooter,
            WordsList_Horror=WordsList_Horror,
            WordsList_RTS=WordsList_RTS,
            WordsList_RPG=WordsList_RPG,
            WordsList_Survival=WordsList_Survival,
            WordsList_Multiplayer=WordsList_Multiplayer,
            WordsList_Souls_FR=WordsList_Souls_FR,
            WordsList_Shooter_FR=WordsList_Shooter_FR,
            WordsList_Horror_FR=WordsList_Horror_FR,
            WordsList_RTS_FR=WordsList_RTS_FR,
            WordsList_RPG_FR=WordsList_RPG_FR,
            WordsList_Survival_FR=WordsList_Survival_FR,
            WordsList_Multiplayer_FR=WordsList_Multiplayer_FR
        )

    live_method = 'live_Time'

    @staticmethod
    def error_message(values):
        if values['Time_Justify'] == 'other' and values["Autre_Justify"] is None:
            return "Il semble que vous avez sélectionné \'Autre\' dans votre réponse. Veuillez expliquer pourquoi."

class rrpp(Page):
    form_model = 'player'
    form_fields = ['Joueur', "Platform_1", "Platform_2" ,"Platform_3", 'Jeu_Favori', 'Jeu_Justification', ]

    @staticmethod
    def error_message(values):
        if values['Joueur'] is True and (values["Platform_1"] is None):
            return "Veuillez indiquer sur quelle(s) plate-forme(s) vous jouez."
        if values['Jeu_Favori'] is not None and (values["Jeu_Justification"] is None):
            return "Veuillez indiquer (en 2-3 lignes) pourquoi avez-vous choisi ce jeu-ci."

    def before_next_page(self):
        print(self.player.choice)
        if str(self.player.choice)  == str(Constants.WordsList_Souls_FR):
            self.player.choice = "Souls"
        elif  str(self.player.choice)  == str(Constants.WordsList_Shooter_FR):
            self.player.choice = "Shooter"
        elif  str(self.player.choice)  == str(Constants.WordsList_Horror_FR):
            self.player.choice = "Horror"
        elif  str(self.player.choice)  == str(Constants.WordsList_RTS_FR):
            self.player.choice = "RTS"
        elif  str(self.player.choice) == str(Constants.WordsList_RPG_FR):
            self.player.choice = "RPG"
        elif  str(self.player.choice) == str(Constants.WordsList_Survival_FR):
            self.player.choice = "Survival"
        elif  str(self.player.choice)  == str(Constants.WordsList_Multiplayer_FR):
            self.player.choice = "Multiplayer"

class dme(Page):
    form_model = 'player'
    form_fields = ['Age', 'Genre', 'Location', 'Discipline', "CSP", "Education","Tirage"]

class fin(Page):
    form_model = 'player'
    def vars_for_template(self):
        code = self.participant.code
        return dict(
            code=code)
page_sequence = [rprr, rrpp, dme, fin]


