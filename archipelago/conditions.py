class MultLogic():pass
class is_universe():pass
class is_genus():pass
class isnt_genus():pass
class AND():pass
class OR():pass
imps={
	MultLogic(["bone_tools"],OR(isnt_genus('demonic'), is_genus('demonic'))),

	MultLogic(["psychic_energy"],is_genus('eldritch')),

	MultLogic(["psychic_attack"],is_genus('eldritch')),

	MultLogic(["alt_lodge"],OR(AND(is_genus('fungi'), isnt_genus('carnivore'), isnt_genus('herbivore')), AND(is_genus('carnivore'), is_genus('demonic')), is_genus('synthetic'), is_genus('eldritch'))),

	MultLogic(["agriculture"],AND(OR(is_genus('herbivore'), AND(isnt_genus('carnivore'), isnt_genus('fungi'), isnt_genus('demonic'))),AND(isnt_genus('synthetic'), isnt_genus('eldritch')))),

	MultLogic(["wind_plant"],AND(OR(is_genus('carnivore'), is_genus('fungi'), is_genus('synthetic'), is_genus('demonic'), is_genus('eldritch')),isnt_genus('herbivore'))),

	MultLogic(["republic", "socialist"],is_genus('demonic')),

	MultLogic(["magocracy"],is_universe('magic')),

	MultLogic(["mana", "ley_lines", "rituals", "crafting_ritual", "conjuring", "res_conjuring", "alchemy"],is_universe('magic')),

	MultLogic(["clerics"],is_universe('magic')),

	MultLogic(["secret_society", "cultists", "conceal_ward", "subtle_rituals", "pylon_camouflage", "fake_tech"],is_universe('magic')),

	MultLogic(["might", "executions", "secret_police"],is_universe('evil')),

	MultLogic(["captive_housing"],is_genus('eldritch')),

	MultLogic(["torture"],is_genus('eldritch')),

	MultLogic(["thrall_quarters"],is_genus('eldritch')),

	MultLogic(["psychic_finance"],is_genus('eldritch')),

	MultLogic(["mind_break"],is_genus('eldritch')),

	MultLogic(["psychic_stun"],is_genus('eldritch')),

	MultLogic(["smokehouse"],AND(is_genus('carnivore'), isnt_genus('synthetic'), isnt_genus('demonic'), isnt_genus('herbivore'))),

	MultLogic(["soul_well"],AND(is_genus('demonic'), isnt_genus('synthetic'))),

	MultLogic(["compost"],AND(is_genus('fungi'), isnt_genus('synthetic'))),

	MultLogic(["hot_compost"],is_genus('fungi')),

	MultLogic(["mulching"],is_genus('fungi')),

	MultLogic(["adv_mulching"],is_genus('fungi')),

	MultLogic(["demonic_craftsman"],is_genus('demonic')),

	MultLogic(["evil_planning"],is_genus('demonic')),

	MultLogic(["aphrodisiac"],isnt_genus('synthetic')),

	MultLogic(["carpentry"],isnt_genus('demonic')),

	MultLogic(["master_craftsman"],isnt_genus('demonic')),

	MultLogic(["urban_planning"],isnt_genus('demonic')),

	MultLogic(["market"],isnt_genus('demonic')),

	MultLogic(["tax_rates"],isnt_genus('demonic')),

	MultLogic(["large_trades"],isnt_genus('demonic')),

	MultLogic(["corruption"],isnt_genus('demonic')),

	MultLogic(["massive_trades"],isnt_genus('demonic')),

	MultLogic(["trade"],isnt_genus('demonic')),

	MultLogic(["diplomacy"],isnt_genus('demonic')),

	MultLogic(["freight"],isnt_genus('demonic')),

	MultLogic(["stone_axe"],AND(isnt_genus('plant'), isnt_genus('heat'), isnt_genus('demonic'))),

	MultLogic(["copper_sledgehammer"],isnt_genus('plant')),

	MultLogic(["iron_sledgehammer"],isnt_genus('plant')),

	MultLogic(["steel_sledgehammer"],isnt_genus('plant')),

	MultLogic(["titanium_sledgehammer"],isnt_genus('plant')),

	MultLogic(["hospital"],isnt_genus('synthetic')),

	MultLogic(["cement"],isnt_genus('avian')),

	MultLogic(["rebar"],isnt_genus('avian')),

	MultLogic(["steel_rebar"],isnt_genus('avian')),

	MultLogic(["portland_cement"],isnt_genus('avian')),

	MultLogic(["screw_conveyor"],isnt_genus('avian')),

	MultLogic(["missionary"],isnt_genus('demonic')),

}