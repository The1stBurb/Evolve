class MultLogic():pass
class is_genus():pass
class isnt_genus():pass
imps={
	MultLogic(["bone_tools"],(not has_race['soul_eater'] or has_race['evil'])( true;, false )inv),
	MultLogic(["wooden_tools"],(has_race['soul_eater'] and not has_race['evil'])( true , false;)),
	MultLogic(["sundial"],(not has_race['gravity_well'] or (has_race['gravity_well'] and has_tech[transport]))( true , false;)),
	MultLogic(["wagon"],(has_tech[farm] or has_tech[s_lodge] or (has_tech[hunting] and tech_is[hunting,>=,2]) or (has_race['soul_eater'] and not race_is[species,==,'wendigo'] and tech_is[housing,>=,1] and tech_is[currency,>=,1]))( true , false;)),
	MultLogic(["minor_wish","major_wish","psychic_energy"],),
	MultLogic(["psychic_attack"],),
	MultLogic(["lodge"],has_tech[s_lodge]( true;, false )inv),
	MultLogic(["alt_lodge"],(((race_is[species,===,'wendigo'] or has_race['detritivore']) and not has_race['carnivore'] and not has_race['herbivore']) or (has_race['carnivore'] and has_race['soul_eater']) or has_race['artifical'] or has_race['unfathomable'] or has_race['forager'])( true , false;)),
	MultLogic(["agriculture"],(has_race['herbivore'] or (not has_race['carnivore'] and not has_race['detritivore'] and not has_race['soul_eater']))( true , false;)),
	MultLogic(["wind_plant"],(has_race['carnivore'] or has_race['detritivore'] or has_race['artifical'] or has_race['soul_eater'] or has_race['unfathomable'] or has_race['forager'])( true , false;)),
	MultLogic(["banquet"],(global.stats.achieve['endless_hunger'] and stats_is[achieve['endless_hunger'].l,>=,1])( true , false;)),
	MultLogic(["steel","bessemer_process","oxygen_converter","electric_arc_furnace"],has_race['steelen']( true;, false )inv),
	MultLogic(["republic","socialist"],((has_tech[trade] and has_tech[trade] >= 2) or has_race['terrifying'])( true , false;)),
	MultLogic(["magocracy"],race_is[universe,===,'magic']( true , false;)),
	MultLogic(["governor"],(global.genes['governor'] and not civic_is[govern.type,==,'anarchy'])( true , false;)),
	MultLogic(["matter_replicator"],(global.stats.achieve['adam_eve'] and stats_is[achieve.adam_eve.l,>=,5])( true , false;)),
	MultLogic(["synthetic_fur"],),
	MultLogic(["reclaimer","shovel","iron_shovel","steel_shovel","titanium_shovel","alloy_shovel"],(not has_race['kindling_kindred'] and not has_race['smoldering'])(race_is[species,===,'wendigo'](has_race['soul_eater']( true;, false ), true ), false )inv),
	MultLogic(["mad"],false; }
            return has_race['truepath'](,(has_tech[world_control]( true;, false ) )inv)),
	MultLogic(["mana","ley_lines","rituals","crafting_ritual","conjuring","res_conjuring","alchemy"],race_is[universe,===,'magic']( true , false;)),
	MultLogic(["clerics"],(race_is[universe,===,'magic'] and global.genes['ancients'] and global.genes['ancients'] >= 2 and global.civic.priest.display)( true , false;)),
	MultLogic(["secret_society","cultists","conceal_ward","subtle_rituals","pylon_camouflage","fake_tech"],(race_is[universe,===,'magic'] and has_race['witch_hunter'])( true , false;)),
	MultLogic(["might","executions","secret_police"],race_is[universe,===,'evil']( true , false;)),
}