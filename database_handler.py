from connection_common import connection_handler


@connection_handler
def get_boards(cursor):
    cursor.execute("""
        SELECT * FROM board """)
    return cursor.fetchall()


@connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
    SELECT * FROM card WHERE card.board_id = %(board_id)s
    """, {'board_id': board_id})
    return cursor.fetchall()
