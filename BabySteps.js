class Player {
  constructor() {
    this.health = 20;
    this.maxHealth = 20;
    this.minHealth = 5;
    this.backwardWay = true;
    this.needHeal = false;
  }
  
  
  playTurn(warrior) 
  { 
    this.managePivot(warrior);
    this.manageState(warrior);    
  }


  managePivot(warrior)
  {
    if (warrior.feel().isWall()) 
      { 
        warrior.pivot();
      }
      else
      {
          this.manageAction(warrior);
      }
  }


  manageState(warrior)
  {
    this.health = warrior.health();
    this.needHealFalse(warrior);
    this.needHealTrue(warrior);
  }


    manageAction(warrior)
    {
      if (warrior.feel().isEmpty()) 
      {
        this.shootBackward(warrior);
      }
      else 
      {
        this.manageUnit(warrior);
      }
    }


    manageHealth(warrior) 
    {
      if (this.needHeal) 
      {
        if (warrior.health() < this.health)
        {
          warrior.walk('backward');
        }
        else
        {
          warrior.rest();
        }
      }
      else 
      {
        warrior.walk();
      }
    }
  
  
  manageUnit(warrior)
  {
     if (warrior.feel().getUnit().isEnemy()) 
      {
        warrior.attack();
      }
      else
      {
        warrior.rescue();
      }
  }

  
  needHealTrue(warrior)
  {
    if (warrior.health() < 20)
      {
        this.needHeal = true;
      }
  }


  needHealFalse(warrior)
  {
    if (warrior.health() === this.maxHealth)
      {
        this.needHeal = false; 
      } 
  }


  isEnemyInSightForway(warrior) 
  {
    const spaceWithUnit = warrior.look().find(space => space.isUnit());
    return spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
  }


  shootForway(warrior) 
  {
  if (this.isEnemyInSightForway(warrior))
    {
      warrior.shoot();
    }
    else
    {
      this.manageHealth(warrior);
    }
  }

  
  isEnemyInSightBackward(warrior)
  {
    const spaceWithUnit = warrior.look('backward').find(space => space.isUnit());
    return spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
  }


  shootBackward(warrior) 
  {
  if (this.isEnemyInSightBackward(warrior))
    {
      warrior.shoot('backward');
    }
    else
    {
      this.shootForway(warrior);
    }
  }
}
