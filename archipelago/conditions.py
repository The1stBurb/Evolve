class MultLogic():pass
class is_universe():pass
class is_genus():pass
class isnt_genus():pass
class AND():pass
class OR():pass
imps={
	MultLogic(["bone_tools"],OR(isnt_genus('soul_eater'), is_genus('evil'))),
	MultLogic(["alt_lodge"],OR(AND(is_genus('detritivore'), isnt_genus('carnivore'), isnt_genus('herbivore')), AND(is_genus('carnivore'), is_genus('soul_eater')), is_genus('artifical'), is_genus('unfathomable'))),
	MultLogic(["agriculture"],AND(OR(is_genus('herbivore'), AND(isnt_genus('carnivore'), isnt_genus('detritivore'), isnt_genus('soul_eater'))),AND(isnt_genus('artifical'), isnt_genus('unfathomable')))),
	MultLogic(["wind_plant"],AND(OR(is_genus('carnivore'), is_genus('detritivore'), is_genus('artifical'), is_genus('soul_eater'), is_genus('unfathomable')),isnt_genus('herbivore'))),
	MultLogic(["republic", "socialist"],is_genus('terrifying')),
	MultLogic(["magocracy"],is_universe('magic')),
	MultLogic(["mana", "ley_lines", "rituals", "crafting_ritual", "conjuring", "res_conjuring", "alchemy"],is_universe('magic')),
	MultLogic(["clerics"],is_universe('magic')),
	MultLogic(["secret_society", "cultists", "conceal_ward", "subtle_rituals", "pylon_camouflage", "fake_tech"],is_universe('magic')),
	MultLogic(["might", "executions", "secret_police"],is_universe('evil')),
}