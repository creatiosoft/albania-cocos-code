var TableContent = require('TableContent');
var TableHandler = require('TableHandler');
var Checkbox = require('Checkbox');
var PopupManagerType = require('PopUpManager').PopUpManager;
var PopUpType = require('PopUpManager').PopUpType;
var K = require("GameConfig").K;
var Variation = cc.Enum({
    None: -1,
    TexasHoldem: 1,
    Omaha: 2,
    OmahaHiLo: 3,
    OpenFaceChinesePoker: 4,
});

var tabType = cc.Enum({
    CashGames: 1,
    SitAndGo: 2,
    Tournaments: 3,
});
/**
 * @class Table
 * @classdesc base class for all table presenter module.
 * @classdesc functionalities - populate table/ sorting/ filtering 
 * @memberof Screens.Lobby.Table
 */
cc.Class({
    extends: cc.Component,

    properties: {
        handler: {
            default: null,
            type: TableHandler
        },
        realMoney: {
            default: null,
            type: Checkbox
        },
        variation: Variation.TexasHoldem,
        contentHolder: {
            default: null,
            type: cc.Node,
        },
        original: {
            default: null,
            type: cc.Node,
        },
        originalOFC: {
            default: null,
            type: cc.Node,
        },
        headContent: {
            default: null,
            type: cc.Node,
        },
        headContentOFC: {
            default: null,
            type: cc.Node,
        },
        stakeFilterLabel: {
            default: null,
            type: cc.Label,
        },
        contentPool: {
            default: [],
        },
        popUpManager: {
            default: null,
            type: PopupManagerType,
        },
        darkColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        lightColor: {
            default: new cc.Color(),
            // type: cc.Color,
        },
        isSortedByName: {
            default: false,
            visible: false,
        },
        isSortedByVariation: {
            default: false,
            visible: false,
        },
        isSortedByType: {
            default: false,
            visible: false,
        },
        isSortedByMinBuy: {
            default: false,
            visible: false,
        },
        isSortedByMaxBuy: {
            default: false,
            visible: false,
        },
        isSortedByMinPlayers: {
            default: false,
            visible: false,
        },
        isSortedByMaxPlayers: {
            default: false,
            visible: false,
        },
        isSortedByStakes: {
            default: false,
            visible: false,
        },
        isSortedByFlops: {
            default: false,
            visible: false,
        },
        isSortedByWaiting: {
            default: false,
            visible: false,
        },
        isSortedByPots: {
            default: false,
            visible: false,
        },
        nameReverse: {
            default: false,
            visible: false,
        },
        variationReverse: {
            default: false,
            visible: false,
        },
        typeReverse: {
            default: false,
            visible: false,
        },
        minBuyReverse: {
            default: false,
            visible: false,
        },
        maxBuyReverse: {
            default: false,
            visible: false,
        },
        minPlayersReverse: {
            default: false,
            visible: false,
        },
        maxPlayersReverse: {
            default: false,
            visible: false,
        },
        flopReverse: {
            default: false,
            visible: false,
        },
        stakeReverse: {
            default: false,
            visible: false,
        },
        waitingReverse: {
            default: false,
            visible: false,
        },
        potReverse: {
            default: false,
            visible: false,
        },
        noFavInfo: {
            default: null,
            type: cc.Node,
        },
        createRowsCallBack: null,
        tempCallback: null,
        tempSelection: null,
        DropDownData: null,
    },

    /**
    * @method onLoad
    * @description Lifecycle callback, Used to Register some broadcast as tableUpdate, Perform some alignmetn of widget!
    * @memberof Screens.Lobby.Table.Table#
    */
    onLoad: function() {
        // this.variation = K.Variation.TexasHoldem;
        this.lobbyData = [];
        this.contentHolder.getComponent(cc.Widget).isAlignTop = false;
        this.createRowsCallBack = this.createRows.bind(this);
        GameManager.on(K.GameEvents.onReset, function() {
            this.tempSelection = null;
            this.lobbyData = [];
        }.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableUpdate, this.onTableUpdate.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableView, this.onSideTableUpdate.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.removeTable, this.removeTable.bind(this));
        ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.addTable, this.addTable.bind(this));
        ServerCom.pomeloRequest(K.PomeloAPI.getFilters, this.realMoney.getSelection(), function(response) {
            this.DropDownData = response;
            this.onEnable();
        }.bind(this), function(error) {});
        this.initGameTypeFilter();
        if (this.tableInfoHolder)
            this.tableInfoHolder.getComponent(cc.Widget).isAlignTop = false;
        this.favTableCB.registerCallback(this.setFavTable.bind(this));
        this.resetAllBools();
        this.applyFilterCB = this.applyFilter.bind(this);
       

    },
    registerUPandDOWN: function(){
        return
          var enterKeyRef = this;
        this.upDownListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed(key, event) {
              if(key == cc.KEY.up || key == cc.KEY.down || key == cc.KEY.enter)
              {
                  enterKeyRef.scroll(key);
              }
              
                    

               
                   event.stopPropagation();
            }
    })
         cc.eventManager.addListener(this.upDownListener, this.node);
},

scroll: function(val){
    if(val == cc.KEY.enter)
    {
        TableContent.prevSelection.dblClk = true;
        TableContent.prevSelection.node.emit('touchstart');
        return;
    }
    var tempArray = this.contentHolder.children;
    var i;
   for( i = 0; i < tempArray.length; i++)
   {
       if(TableContent.prevSelection == tempArray[i].getComponent('TableContent'))
           break; 
   }
    val = (val == cc.KEY.up ? -1:1);
    var index = i+val;
    if(index > -1 && index < tempArray.length)
    tempArray[i+val].getComponent('TableContent').onClick();
  //  tempArray[tempArray.length-1].getComponent('TableContent').onClick();
  //  var selected = 

},

    /**
    * @method initDropDowns
    * @description Handle set as favourite or remove from fav star for particular tables!
    * @param {object} data - Data to be set in dropdown!
    * @memberof Screens.Lobby.Table.Table#
    */
    initDropDowns: function(data) {
        // this.gameTypeDropdown.setContent();
        // this.stakesDropdown.setContent(data.);
        //this.maxPlayerDropdown.setContent();
        if (data.playersRequired[0] !== 'All') 
        { data.playersRequired.splice(0, 0, 'All'); }
        this.maxPlayersDropdown.setContent(data.playersRequired);

    },
    /**
    * @method setFavTable
    * @description Used to  set/reset favourite table.
    * @memberof Screens.Lobby.Table.Table#
    */
    setFavTable: function() {
        var selection = this.favTableCB.getSelection();
        var inst = this;
        if (!!TableContent.prevSelection) {
            if (selection) {
                this.handler.setFavTable(GameManager.user.playerId, TableContent.prevSelection.channelData._id, TableContent.prevSelection.channelData.channelType, function(response) {
                    if (response.success) {
                        TableContent.prevSelection.channelData.favourite = true;
                        var ind = inst.handler.contents.indexOf(TableContent.prevSelection.channelData);
                        inst.handler.contents[ind].favourite = true;
                    } else {
                        this.favTableCB.setSelection(!selection);
                    }
                });
            } else {
                this.handler.removeFavTable(GameManager.user.playerId, TableContent.prevSelection.channelData._id, function(response) {
                    if (response.success) {
                        TableContent.prevSelection.channelData.favourite = false;
                        var ind = inst.handler.contents.indexOf(TableContent.prevSelection.channelData);
                        inst.handler.contents[ind].favourite = false;
                        if (inst.favPrimaryCB && inst.favPrimaryCB.getSelection()) {
                            inst.applyFilter();
                        }
                    } else {
                        this.favTableCB.setSelection(!selection);
                    }
                });
            }
        } else {
            this.favTableCB.setSelection(!selection);
        }

    },

    /**
    * @method onTableUpdate
    * @description Broadcast if player joins or leaves any table!
    * @param {object} eventData - Data which will be updated in table
    * @memberof Screens.Lobby.Table.Table#
    */   
    onTableUpdate: function(eventData) {
        for (var key in this.lobbyData) {
            for (var index = 0; index < this.lobbyData[key].length; index++) {
                if (this.lobbyData[key][index]._id == eventData._id) {
    
                    for (var keys in eventData.updated) {
                        this.lobbyData[key][index][keys] = eventData.updated[keys];
                    }
                    break;
                }
            }
        }
        this.scheduleOnce(function() {
            this.applyFilter(true);
        }, 0.2);
    },
    
    /**
    * @method onSideTableUpdate
    * @memberof  Screens.Lobby.Table.Table#
    */
    onSideTableUpdate: function(eventData) {},

    
    /**
    * @method addTable
    * @description Add Table From DashBoard
    * @param {Object} data -Data to be updated in view
    * @memberof  Screens.Lobby.Table.Table#
    */
    addTable: function(data) {
        data.updated._id = data._id;
        var key = data.updated.isRealMoney + "" + data.updated.channelVariation;
        if (this.lobbyData[key])
            this.lobbyData[key].push(data.updated);
        if (this.realMoney.getSelection() + this.variation == key) {
            this.createRow(data.updated, this.contentPool.length, null, null);
            this.applyFilter(true);
        }
    },

    /**
    * @method removeTable
    * @description Remove Table from Dashboard
    * @param {object} data -data having id of content to be removed!
    * @memberof Screens.Lobby.Table.Table#
    */
    removeTable: function(data) {
        for (var key in this.lobbyData) {
            for (var index = 0; index < this.lobbyData[key].length; index++) {
                if (this.lobbyData[key][index]._id == data._id) {
                    this.lobbyData[key].splice(index, 1);
                    break;
                }
            }
        }

        for (var index = 0; index < this.contentPool.length; index++) {
            if (this.contentPool[index].getComponent("TableContent").channelData._id == data._id) {
                this.contentPool[index].destroy();
                this.contentPool.splice(index, 1);
                this.applyFilter(true);
                break;
            }
        }
    },

    //TableContent are visible, so to reflect the changes in the view immediately.
    // registerLobbyEvents: function(tableContentRef) {
    //     ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.joinTableList, tableContentRef.onTableListChanged.bind(tableContentRef));
    //     ServerCom.pomeloBroadcast(K.LobbyBroadcastRoute.tableUpdate, tableContentRef.onTableUpdated.bind(tableContentRef));
    // },

    
    /**
    * @method onDisable
    * @description LifeCycle callback, called when the node is disabled deRigster favourite button callback; 
    * @memberof Screens.Lobby.Table.Table#
    */    
    onDisable: function() {
     
        if (this.favPrimaryCB) {
            this.favPrimaryCB.deregisterCallback(this.applyFilterCB);
        }
            //    cc.eventManager.removeListener(this.upDownListener);
    },

    /**
    * @method onEnable
    * @description this is called everytime the node is enabled, 
    * @description Functionalities - register fav button callback, set Player Filter, get TableData!
    * @memberof Screens.Lobby.Table.Table# 
    */    
    onEnable: function() {
         this.registerUPandDOWN();
        if (this.favPrimaryCB) {
            this.favPrimaryCB.callbacks = [];
            this.favPrimaryCB.registerCallback(this.applyFilterCB);
        }
        TableContent.prevSelection = null;
        TableContent.callback = this.tableContentClick.bind(this);
        this.unschedule(this.tempCallback);
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            this.headContent.active = false;
            this.headContentOFC.active = true;
            this.stakeFilterLabel.string = "Point Cost:";
        } else {
            this.headContent.active = true;
            this.headContentOFC.active = false;
            LocalizedManager.setTextKey(this.stakeFilterLabel.node, 'TXT_STAKES');
        }
        this.setPlayerFilters(); //Error;
        this.scheduleOnce(function() {
            this.onGetTableData();
        }.bind(this), 0.2);

    },
    
    /**
    * @method onGetTableData
    * @description Gets table data from the server
    * @param {String} channelType -Type of Channel
    * @memberof Screens.Lobby.Table.Table#
    */    
    onGetTableData: function(channelType = null) {
        TableContent.prevSelection = null;
        var inst = this;
        var isReal = this.realMoney.getSelection();
        var key = isReal + "" + this.variation;
    //    console.log("key " + key);
        if (this.lobbyData[key]) {
          //  console.log("key " + key);
           // console.log(this.lobbyData[key]);
            inst.handler.contents = this.lobbyData[key];
            inst.applyFilter(true);
        } else {
            this.clearContents();
            this.handler.getTableData(isReal, this.variation, function(response) {
                if (response.success) {
                    inst.handler.contents = inst.filterByTournamentType(response.result);
                    inst.lobbyData[key] = inst.handler.contents;
                    //console.log(inst.lobbyData[key]);
                    inst.applyFilter(true);
                } else {
                    // handle error
                }
            }, channelType);
        }
    },

    /**
    * @method filterByTournamentType
    * @description return the filtered content according to tournament type
    * @param {Array} content -Object/Data to be filtered
    * @param {boolean} pass - Decide whether filter the data or not
    * @param {boolean} checkSitNGo -specify if tournament type is sitnGo or normal
    * @memberof Screens.Lobby.Table.Table#
    */
    filterByTournamentType: function(content, pass = true, checkSitNGo = true) {
        if (pass)
            return content;
        var filteredContent = [];
        for (var i = 0; i < content.length; i++) {
            var flag = content[i].tournamentType === K.TournamentType.SitNGo;
            flag = checkSitNGo ? flag : !flag;
            if (flag) {
                filteredContent.push(content[i]);
            }
        }
        return filteredContent;
    },

    /**
    * @method startPomelo
    * @description Start connection with game server 
    * @param {object} address -Server address!
    * @param {callback} callback -callback to be executed if response is success!
    * @memberof Screens.Lobby.Table.Table#
    */
    startPomelo: function(address, callback) {
        // pomelo int
        pomelo.init({
            //  encrypt: true,
            host: address.gameServer,
            port: address.gamePort,
            log: true
        }, function() {
            if (callback !== null && callback !== undefined) {
                callback();
            }
        });
    },

    /**
    * @method initGameTypeFilter
    * @description initialize game filter statically! and register callback!
    * @memberof Screens.Lobby.Table.Table#
    */
    initGameTypeFilter: function() {
        //list for game type dropdown
        var gameTypeContent = ["All", "Standard (30s)", "Turbo (20s)", "Hyper-Turbo (10s)"];
        this.gameTypeDropdown.setContent(gameTypeContent);
        //list for game type dropdown
        this.setPlayerFilters();
        //list for game type dropdown
        var stakesDropdownContent = ["All", "Low", "Mid", "High"];
        this.stakesDropdown.setContent(stakesDropdownContent);

        this.gameTypeDropdown.registerCallback(this.applyFilter.bind(this));
        this.stakesDropdown.registerCallback(this.applyFilter.bind(this));
        this.maxPlayersDropdown.registerCallback(this.applyFilter.bind(this));
        this.hideFullTablesCB.registerCallback(this.applyFilter.bind(this));

    },

    /**
    * @method setPalyerFilters
    * @description Method to handle players dropdown for ofc variation and others
    * @memberof Table#
    */
    setPlayerFilters: function() {
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            var maxPlayersContent = ["All", 2, 3];
        } else {
            var maxPlayersContent = ["All", 2, 6, 9];
        }
        this.maxPlayersDropdown.setContent(maxPlayersContent);
    },

    /**
    * @method populateTable
    * @description Populate table rows
    * @param {object} data -data to show in table content!
    * @memberof Screens.Lobby.Table.Table#
    */    
    populateTable: function(data) {

        this.unschedule(this.tempCallback);
        var instance = null;
        var tableContent = null;
        var content = null;
        var child = null;
        // this.clearContents();
        //this.createRows(data);

        var baseContent = (this.variation == K.Variation.OpenFaceChinesePoker) ? this.originalOFC : this.original;

        if (this.contentPool.length == 0) {
            this.createRows(data);
        } else {

            if (this.contentPool[0].name == baseContent.name) {

                if (this.contentPool.length > data.length) {
                    this.destroyRows(data.length);
                    this.updateTable(data, data.length);
                } else if (this.contentPool.length < data.length) {
                    this.createRows(data);
                    this.updateTable(data);
                } else {
                    this.updateTable(data);
                  
                }
            } else {
                this.destroyRows(0, this.createRows.bind(this), data);
            }

        }

        if (tableContent !== null) {
            tableContent.prevSelection = null;
        }
    },

    /**
    * @method updateTable
    * @description Add new data in the table
    * @param {Object} data -data to be updated
    * @memberof Screens.Lobby.Table.Table#
    */
    updateTable: function(data, lastIndex = null) {
        lastIndex = (!!lastIndex) ? lastIndex : this.contentPool.length;
        var content = null;
        var entry = null;
        for (var i = 0; i < lastIndex; i++) {
            content = this.contentPool[i].getComponent('TableContent');
            entry = this.makeContent(data[i]);
            content.channelData = data[i];
            content.setContentText(entry);
            if (i % 2 === 0) {
                content.bg.color = this.lightColor;
            } else {
                content.bg.color = this.darkColor;
            }
            if (content.joinEffect) {
                if (this.handler.joinTableList.indexOf(content.channelData._id) !== -1) {
                    content.joinEffect.active = true;
                } else {
                    content.joinEffect.active = false;
                }
            }

        }
        this.showSelection();
    },
    
    /**
    * @method createRows
    * @description  create new rows recursively
    * @param {object} data  - data to be set on lobby Table
    * @param {boolean} stop - Prevent from creating new rows (not being used now)
    * @memberof Screens.Lobby.Table.Table#
    */
    createRows: function(data, stop = false) {
        var lastIndex = stop ? 0 : data.length;
        if (this.contentPool.length < lastIndex) {
            this.createRow(data[this.contentPool.length], this.contentPool.length, data, this.createRowsCallBack);
        } else {
            this.showSelection();
        }

    },
    
    /**
    * @method createRow
    * @description method to create a row called from createRows
    * @param {object} entry - data to be created
    * @param {number} i - index from where data will start to create
    * @param {object} data - All the data of table rows passed back to createRows method as param !
    * @param {callback} callback - callback having createRows method!
    * @memberof Screens.Lobby.Table.Table#
    */    
    createRow: function(entry, i, data, callback) {
        var instance = null;
        var tableContent = null;
        var content = null;
        content = this.makeContent(entry);
        instance = (this.variation == K.Variation.OpenFaceChinesePoker) ? cc.instantiate(this.originalOFC) : cc.instantiate(this.original);
        instance.setPosition(0, 0);
        this.contentHolder.addChild(instance);
        tableContent = instance.getComponent('TableContent');
        tableContent.setContentText(content);
        // this.registerLobbyEvents(tableContent);
        tableContent.channelData = entry;
        tableContent.table = this;
        instance.active = true;
        this.contentPool.push(instance);
        //child = instance.getChildByName("Bg");
        if (i % 2 === 0) {
            tableContent.bg.color = this.lightColor;
        } else {
            tableContent.bg.color = this.darkColor;
        }

        //    tableContent.joinEffect.active = false;
        if (tableContent.joinEffect) {
            if (this.handler.joinTableList.indexOf(entry._id) !== -1) {
                tableContent.joinEffect.active = true;
            } else {
                tableContent.joinEffect.active = false;
            }
        }
        //callback(data, i);
        if (callback != null) {
            this.tempCallback = function() {
                callback(data);
            };
            this.scheduleOnce(this.tempCallback, 0.1);
        }
    },

  
    /**
    * @method destroyRows 
    * @description detroy rows recursively 
    * @param  {startIndex} startIndex - Index from which the data will be start to destroy!
    * @param {callback} callback -callback
    * @param {object} data -data is used by callback
    * @memberof Screens.Lobby.Table.Table#
    */
    destroyRows: function(startIndex, callback = null, data = null) {
        if (this.contentPool.length > startIndex) {
            this.contentPool[startIndex].destroy();
            this.contentPool.splice(startIndex, 1);
            this.destroyRows(startIndex, callback, data);
        } else {
            if (callback != null) {
                callback(data);
            }
        }
    },

    /**
    * @method clearContents
    * @description Clear existing table row elements
    * @memberof Screens.Lobby.Table.Table#
    */
    clearContents: function() {
        this.unschedule(this.tempCallback);
        for (var index = 0; index < this.contentPool.length; index++) {
            this.contentPool[index].active = false;
            this.contentPool[index].destroy();
        }
        this.contentPool = [];
    },


   
    /**
    * @method refreshSideTable
    * @description Refresh table specific details 
    * @param {boolean} downloadAgain - Request server for side table data if true!
    * @memberof Screens.Lobby.Table.Table#
    */    
    refreshSideTable: function(downloadAgain = true) {
        if (TableContent.prevSelection == null || this.contentPool.length == 0) {
            this.disableSideTable(true);
            return;
        } else {
            this.disableSideTable(false);
        }
        if (TableContent.prevSelection.channelData.favourite) {
            this.favTableCB.setSelection(true);
        } else {
            this.favTableCB.setSelection(false);
        }

        if (downloadAgain) {
            this.currentSideTableData = null;
            this.handler.refreshSideTable(TableContent.prevSelection.channelData, function(response) {
                this.setSideTableData(response);
            }.bind(this), function(response) {});
        } else {
            this.setSideTableData(this.currentSideTableData);
        }
    },


    //---------------------------------------------------sorting--------------------------------------------//
  
    /**
    * @method getFilteredContent
    * @description Get currently displayed content according to filters selected
    * @memberof Screens.Lobby.Table.Table#
    */
        getFilteredContent: function() {
        var content = [];
        for (var i = 0; i < this.contentPool.length; i++) {
            content.push(this.contentPool[i].getComponent('TableContent').channelData);
        }
        return content;
    },


    /**
    * @method onSortByName
    * @description Sort by name button click handler 
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByName: function() {
        this.nameReverse = !this.nameReverse;
        this.removeAllSorting();
        this.isSortedByName = true;
        this.applyFilter();
    },

  
    /**
    * @method onSortByStakes
    * @description Sort by stakes button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByStakes: function() {
        this.stakeReverse = !this.stakeReverse;
        this.removeAllSorting();
        this.isSortedByStakes = true;
        this.applyFilter();
    },

    /**
    * @method onSortByVariation
    * @description Sort by variation button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByVariation: function() {
        this.variationReverse = !this.variationReverse;
        this.removeAllSorting();
        this.isSortedByVariation = true;
        this.applyFilter();
    },


    /**
    * @method onSortByType
    * @description Sort by game type button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByType: function() {
        this.typeReverse = !this.typeReverse;
        this.removeAllSorting();
        this.isSortedByType = true;
        this.applyFilter();
    },

    /**
    * @method onSortByMinBuy
    * @description Sort by min buy amount button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByMinBuy: function() {
        this.minBuyReverse = !this.minBuyReverse;
        this.removeAllSorting();
        this.isSortedByMinBuy = true;
        this.applyFilter();
    },

    /**
    * @method onSortByMaxBuy
    * @description Sort by max buy amount button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByMaxBuy: function() {
        this.maxBuyReverse = !this.maxBuyReverse;
        this.removeAllSorting();
        this.isSortedByMaxBuy = true;
        this.applyFilter();
    },

  
    /**
    * @method onSortByPlayers
    * @description Sort by players button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByPlayers: function() {
        this.maxPlayersReverse = !this.maxPlayersReverse;
        this.removeAllSorting();
        this.isSortedByMaxPlayers = true;
        this.applyFilter();
    },

  
    /**
    * @method onSortByFlops
    * @description Sort by Flops button click handler
    * @memberof Screens.Lobby.Table.Table#
    */    
    onSortByFlops: function() {
        this.flopReverse = !this.flopReverse;
        this.removeAllSorting();
        this.isSortedByFlops = true;
        this.applyFilter();
    },
    
    /**
    * @method onSortByPots
    * @description Sort by Pots button click handler
    * @memberof Screens.Lobby.Table.Table#
    */    
    onSortByPots: function() {
        this.potReverse = !this.potReverse;
        this.removeAllSorting();
        this.isSortedByPots = true;
        this.applyFilter();
    },

    
    /**
    * @method onSortByWaitingPlayers
    * @description Sort by WaitingPlayers button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByWaitingPlayers: function() {
        this.waitingReverse = !this.waitingReverse;
        this.removeAllSorting();
        this.isSortedByWaiting = true;
        this.applyFilter();
    },



    /**
    * @method onSortByMinPlayers
    * @description Sort by min players
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByMinPlayers: function() {
        //  this.minPlayersReverse = !this.minPlayersReverse;
        this.removeAllSorting();
        this.isSortedByMinPlayers = true;
        this.applyFilter();
    },

    
    /**
    * @method  onSortByMaxPlayers
    * @description Sort by max players
    * @memberof Screens.Lobby.Table.Table#
    */
    onSortByMaxPlayers: function() {
        //  this.flopReverse = !this.flopReverse;
        this.removeAllSorting();
        this.isSortedByMaxPlayers = true;
        this.applyFilter();
    },

   
    /**
    * @method sortByName
    * @description Sort by name button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByName: function() {
        //  this.isSortedByName = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.nameReverse, "channelName");
        this.updateTable(newContent);
        this.nameReverse = !this.nameReverse;
    },


    /**
    * @method sortByStakes
    * @description Sort by stakes button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByStakes: function() {
        //  this.isSortedByStakes = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.stakeReverse, "smallBlind");
        this.updateTable(newContent);
        this.stakeReverse = !this.stakeReverse;
    },

   
    /**
    * @method sortByVariation
    * @description Sort by variation button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByVariation: function() {
        // this.isSortedByVariation = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.variationReverse, "channelVariation");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.variationReverse = !this.variationReverse;
    },


    /**
    * @method sortByType
    * @description Sort by game type button click handler 
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByType: function() {
        // this.isSortedByType = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.typeReverse, "turnTime");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.typeReverse = this.typeReverse ? false : true;
    },

   
    /**
    * @method sortByMinBuy
    * @description Sort by min buy amount button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByMinBuy: function() {
        // this.isSortedByMinBuy = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByNumber(newContent, this.minBuyReverse, "minBuyIn");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.minBuyReverse = this.minBuyReverse ? false : true;
    },


    /**
    * @method sortByMaxBuy
    * @description Sort by max buy amount button click handler 
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByMaxBuy: function() {
        //  this.isSortedByMaxBuy = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByNumber(newContent, this.maxBuyReverse, "maxBuyIn");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.maxBuyReverse = this.maxBuyReverse ? false : true;
    },


    /**
    * @method sortByPlayers
    * @description Sort by players button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByPlayers: function() {
        this.sortByMaxPlayers();
    },

   
    /**
    * @method sortByFlops
    * @description Sort by Flops button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByFlops: function() {
        this.isSortedByFlops = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.flopReverse, "flopPercent");
        this.updateTable(newContent);
        this.flopReverse = !this.flopReverse;
    },
 
    /**
    * @method sortByPots
    * @description Sort by Pots button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByPots: function() {
        this.isSortedByPots = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.potReverse, "avgStack");
        this.updateTable(newContent);
        this.potReverse = !this.potReverse;
    },

    
    /**
    * @method sortByWaitingPlayers
    * @description Sort by WaitingPlayers button click handler
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByWaitingPlayers: function() {
        this.isSortedByWaiting = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByString(newContent, this.waitingReverse, "queuePlayers");
        this.updateTable(newContent);
        this.waitingReverse = !this.waitingReverse;
    },

    /**
    * @method sortByMinPlayers
    * @description Sort by min players
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByMinPlayers: function() {
        this.isSortedByMinPlayers = true;
        var newContent = [];
        newContent = this.getFilteredContent();
        newContent = this.handler.sortByNumber(newContent, this.minPlayersReverse, "minPlayers");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.minPlayersReverse = this.minPlayersReverse ? false : true;
    },
  
    /**
    * @method sortByMaxPlayers
    * @description Sort by max players
    * @memberof Screens.Lobby.Table.Table#
    */
    sortByMaxPlayers: function() {
        this.isSortedByMaxPlayers = true;
        newContent = [];
        var newContent = this.getFilteredContent();
        newContent = this.handler.sortByNumber(newContent, this.maxPlayersReverse, "maxPlayers");
        // this.updateTable(this.handler.contents);
        this.updateTable(newContent);
        this.maxPlayersReverse = this.maxPlayersReverse ? false : true;
    },

    /**
    * @method resetAllBools
    * @description Reset bools used for button click handlers - reverse
    * @memberof Screens.Lobby.Table.Table#
    */
    resetAllBools: function() {
        this.nameReverse = false;
        this.stakeReverse = false
        this.variationReverse = false;
        this.typeReverse = false;
        this.minBuyReverse = false;
        this.maxBuyReverse = false;
        this.minPlayersReverse = false;
        this.maxPlayersReverse = false;
        this.flopReverse = false;
        this.waitingReverse = false;
        this.potReverse = false;
    },

    /**
    * @method removeAllSorting
    * @description Clears all sorting 
    * @memberof Screens.Lobby.Table.Table#
    */
    removeAllSorting: function() {
        this.isSortedByName = false;
        this.isSortedByStakes = false;
        this.isSortedByFlops = false;
        this.isSortedByWaiting = false;
        this.isSortedByVariation = false;
        this.isSortedByType = false;
        this.isSortedByMinBuy = false;
        this.isSortedByMaxBuy = false;
        this.isSortedByMinPlayers = false;
        this.isSortedByMaxPlayers = false;
        this.isSortedByPots = false;

    },

    /**
    * @method applySorting
    * @description apply sorting if applicable
    * @memberof Screens.Lobby.Table.Table#
    */
    applySorting: function() {

        if (this.isSortedByName) {
            this.nameReverse = !this.nameReverse;
            this.sortByName();
        }
        if (this.isSortedByStakes) {
            this.stakeReverse = !this.stakeReverse;
            this.sortByStakes();
        }
        if (this.isSortedByFlops) {
            this.flopReverse = !this.flopReverse;
            this.sortByFlops();
        }
        if (this.isSortedByWaiting) {
            this.waitingReverse = !this.waitingReverse;
            this.sortByWaitingPlayers();
        }
        if (this.isSortedByVariation) {
            this.variationReverse = !this.variationReverse;
            this.sortByVariation();
        }
        if (this.isSortedByType) {
            this.typeReverse = !this.typeReverse;
            this.sortByType();
        }
        if (this.isSortedByMinBuy) {
            this.minBuyReverse = !this.minBuyReverse;
            this.sortByMinBuy();
        }
        if (this.isSortedByMaxBuy) {
            this.maxBuyReverse = !this.maxBuyReverse;
            this.sortByMaxBuy();
        }
        if (this.isSortedByMinPlayers) {
            this.minPlayersReverse = !this.minPlayersReverse;
            this.sortByMinPlayers();
        }
        if (this.isSortedByMaxPlayers) {
            this.maxPlayersReverse = !this.maxPlayersReverse;
            this.sortByMaxPlayers();
        }
        if (this.isSortedByPots) {
            this.potReverse = !this.potReverse;
            this.sortByPots();
        }

    },


    //-----------------------------------filtering---------------------------------------------------------------//

    /**
     * apply filters sorting to the main contents and display the resultant content
     * This is called after any filter change or when new tables are created
     */
    /**
    * @method applyFilter
    * @description apply filters sorting to the main contents and display the resultant content
    * @param {boolean} isRequested 
    * @memberof Screens.Lobby.Table.Table#
    */
    applyFilter: function(isRequested = false) {
        var inst = this;
        var hideFT = this.hideFullTablesCB.getSelection();
        var getFav = this.favPrimaryCB ? this.favPrimaryCB.getSelection() : false;
        var game = inst.gameTypeDropdown.getSelection();
        var stakes = inst.stakesDropdown.getSelection();
        var maxPl = inst.maxPlayersDropdown.getSelection();

        if (!!this.handler.contents && this.handler.contents.length > 0) {
            var finalContent = [];
            var flag = true;
            var content = null;
            for (var i = 0; i < this.handler.contents.length; i++) {
                content = this.handler.contents[i];
                flag = true; //initialise flag
                //check full tables 
                if (hideFT) {
                    var playingPlayers = content.channelType == K.ChannelType.Tournament ? content.enrolledPlayers : content.playingPlayers;
                    var maxPlayers = content.channelType == K.ChannelType.Tournament ? content.maxPlayersForTournament : content.maxPlayers;
                    flag = (playingPlayers < content.maxPlayers);
                }
                //check favourites
                if (getFav) {
                    flag = flag && content.favourite;
                }

                //check gameType
                flag = flag && this.isValidByGameType(game, content.turnTime);
                //check stakes
                if (this.variation == K.Variation.OpenFaceChinesePoker) {
                    flag = flag && this.isValidByStakesOFC(content.chipsPointRatio, stakes);
                } else {
                    flag = flag && this.isValidByStakes(content.smallBlind, stakes);
                }
                //check maxplayers
                flag = flag && this.isValidByMaxPlayers(maxPl, content.maxPlayers);

                //push final value
                if (flag) {
                    finalContent.push(content);
                }
            }
    
            this.populateTable(finalContent);
            // this.scheduleOnce(function () {
            this.applySorting();
            // }.bind(this), 0.1);
            this.disableSideTable((finalContent.length == 0), false, true);

        } else {
            this.clearContents();
            isRequested = typeof(isRequested) == typeof(true) ? isRequested : false;
            this.disableSideTable(true, false, isRequested);
        }
    },
   
    /**
    * @method showSelection
    * @description show one selection after everytime tables are refreshed or created 
    * @memberof Screens.Lobby.Table.Table#
    */    
    showSelection: function() {
        var inst = this;
        if (inst.contentPool.length > 0) {
            if (inst.tempSelection == null || inst.tempSelection >= inst.contentPool.length) {
                inst.contentPool[0].getComponent('TableContent').onClick();
            } else if (inst.tempSelection !== null && inst.tempSelection < inst.contentPool.length) {
                if (inst.tempSelection == -1) {
                    inst.tempSelection = 0;
                }
                inst.contentPool[inst.tempSelection].getComponent('TableContent').onClick();
            }
        } else {
            inst.tempSelection == null;
            //TableContent.prevSelection = null;
        }
    },

    
    /**
    * @method getFavourites
    * @description filter for favourite tables
    * @param  {object} intiContert
    * @param {callBack} callback -Callback to execute
    * @memberof Screens.Lobby.Table.Table#
    */
    getFavourites: function(initContent, callback) {

        if (this.favPrimaryCB && this.favPrimaryCB.getSelection()) {
            var contents = [];
            //  contents = contents.concat(this.handler.contents);
            for (var index = 0; index < initContent.length; index++) {
                if (initContent[index].favourite) { //not implemented yet
                    contents.push(initContent[index]);
                }
            }
            // this.handler.contents = contents;
            // this.populateTable(contents);
            callback(contents);
        } else {
            callback(initContent);
            // this.populateTable(this.handler.contents);
        }
    },

    
    /**
    * @method filterByGameType
    * @description apply filter according to gameType
    * @param {Object} gameType -gameType
    * @param {Object} initContent 
    * @param {callback} callback -Callback to execute
    * @memberof Screens.Lobby.Table.Table#
    */
    filterByGameType: function(gameType, initContent, callback) {
        var contents = [];
        for (var index = 0; index < initContent.length; index++) {
            if (this.isValidByGameType(gameType, initContent[index].turnTime)) {
                contents.push(initContent[index]);
            }
        }
        callback(contents);
    },
   
    /**
    * @method isValidByGameType
    * @description check validity of given value by the selected gameType
    * @param {String} gameType - Represent game speed(turn time)
    * @param {Number} val - Turn time in number
    * @memberof Screens.Lobby.Table.Table#
    */
    isValidByGameType: function(gameType, val) {

        var returnVal = false;
        switch (gameType) {
            case "Hyper-Turbo (10s)":
                returnVal = (val == 10);
                break;
            case "Turbo (20s)":
                returnVal = (val == 20);
                break;
            case "Standard (30s)":
                returnVal = (val == 30);
                break;
            default:
                returnVal = true;
        }
        return (returnVal);
    },

    
    /**
    * @method filterByMaxPlayers
    * @description apply filter according to max players
    * @param {Number} maxPlayers -Maximum no of player
    * @param {Object} prevContents -Object having previous content/data
    * @param {callback} callback -Callback to execute
    * @memberof Screens.Lobby.Table.Table#
    */
    filterByMaxPlayers: function(maxPlayers, prevContents, callback) {
        var contents = [];
        for (var index = 0; index < prevContents.length; index++) {
            if (this.isValidByMaxPlayers(maxPlayers, prevContents[index].maxPlayers)) {
                contents.push(prevContents[index]);
            }
        }
        callback(contents);
    },
  
    /**
    * @method isValidByMaxPlayers
    * @description  check values validity according to selected max players value
    * @param {Number} maxPlayers -maximum number of player
    * @param {Number} val -Number of players on table
    * @memberof Screens.Lobby.Table.Table#
    */
    isValidByMaxPlayers: function(maxPlayers, val) {
       // console.log("max " + maxPlayers);
        if (maxPlayers == 'All')
            return true;
        // var retVal = false;
        // switch (maxPlayers) {
        //     case 2:
        //         retVal = maxPlayers == val;
        //         break;
        //     case 3:
        //         retVal = maxPlayers == val;
        //         break;
        //     case 6:
        //         retVal = maxPlayers == val;
        //         break;
        //     case 9:
        //         retVal = maxPlayers <= val;
        //         break;
        //     default:
        //         retVal = true;
        // }
        return maxPlayers == val;
    },

    /**
    * @method filterByStakes
    * @description apply filter according to stakes
    * @param {String} stakes -Low/Medium/High
    * @memberof Screens.Lobby.Table.Table#
    */
    filterByStakes: function(stakes, prevContents, callback) {
        var contents = [];
        if (this.variation == K.Variation.OpenFaceChinesePoker) {
            for (var index = 0; index < prevContents.length; index++) {
                if (this.isValidByStakesOFC(prevContents[index].chipsPointRatio, stakes)) {
                    contents.push(prevContents[index]);

                }
            }
        } else {
            for (var index = 0; index < prevContents.length; index++) {
                if (this.isValidByStakes(prevContents[index].smallBlind, stakes)) {
                    contents.push(prevContents[index]);

                }
            }
        }
        callback(contents);

    },
  
    /**
    * @method isValidByStakes
    * @description check validity according to stakes selected
    * @param {number} value -Stake Value
    * @param {string} stakes -Low/Medium/High
    * @memberof Screens.Lobby.Table.Table#
    */
isValidByStakes: function(value, stakes) {
        if (stakes == "All") {
            return true;
        }
        if (stakes == "Low") {
            return (value > 0 && value <= 25);
        } else if (stakes == "Mid") {
            return (value > 25 && value <= 100);
        } else if (stakes == "High") {
            return (value > 100);
        } else {
            return false;
        }
    },

    /**
    * @method isValidByStakes
    * @description check validity according to stakes selected
    * @param {number} value -Stake Value
    * @param {string} stakes -Low/Medium/High
    * @memberof Screens.Lobby.Table.Table#
    */
    isValidByStakesOFC: function(value, stakes) {
        if (stakes == "All") {
            return true;
        }
        if (stakes == "Low") {
            return (value > 0 && value < 10);
        } else if (stakes == "Mid") {
            return (value >= 10 && value < 20);
        } else if (stakes == "High") {
            return (value >= 20);
        } else {
            return false;
        }
    },

    /**
    * @method hideFullTables
    * @description hide tables where seats are full
    * @param {calback} callback -Callback to execute
    * @memberof Screens.Lobby.Table.Table#
    */
    hideFullTables: function(callback) {
        var val = this.hideFullTablesCB.getSelection();
        var contents = [];
        if (val) {
            for (var index = 0; index < this.handler.contents.length; index++) {
                var content = this.handler.contents[index];
                var playingPlayers = content.channelType == K.ChannelType.Tournament ? content.enrolledPlayers : content.playingPlayers;
                var maxPlayers = content.channelType == K.ChannelType.Tournament ? content.maxPlayersForTournament : content.maxPlayers;
                if (playingPlayers < content.maxPlayers) {
                    contents.push(this.handler.contents[index]);
                }
            }
            callback(contents);
        } else {
            callback(this.handler.contents);
        }
    },

    /**
    * @method disableSideTable
    * @description disable side table 
    * @param {boolean} val 
    * @param {boolean} noFav 
    * @param {boolean} showMsg -Show messge if true else don't show
    * @memberof Screens.Lobby.Table.Table#
    */
    disableSideTable: function(val = true, noFav = false, showMsg = true) {
        noFav = this.favPrimaryCB ? this.favPrimaryCB.getSelection() : false;
        if (val) {
            this.noFavInfo.active = noFav;
            this.sideTableInfo.active = !noFav;
            this.sideTableInfo.getComponentInChildren(cc.Label).node.active = showMsg;
            TableContent.prevSelection = null;
        } else {
            this.noFavInfo.active = val;
            this.sideTableInfo.active = val;
        }
    },

    /**
    * @method showFavInstructions
    * @description method to show instruction to mark table as favourite popup 
    * @memberof Screens.Lobby.Table.Table#
    */
    showFavInstructions: function() {
        GameManager.popUpManager.show(PopUpType.InstructionPopup, null, function() {});
    },
 
    /**
    * @method capitalizeFirstLetter
    * @description method to capitalize first letter of a string
    * @memberof Screens.Lobby.Table.Table#
    */
    capitalizeFirstLetter: function(inp) {
        inp = inp.toLowerCase();
        return inp.replace(/^.{1}/g, inp[0].toUpperCase());
    },

    updateTableVal: function(data) {

    },

    /**
     * @method highlightJoinTable
     * @description show table joined by player
     * @memberof DataFormats.ResponseTypes#
     */
    highlightJoinTable: function() {

    },

});